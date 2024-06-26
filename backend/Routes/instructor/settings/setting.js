const router = require('express').Router();
const pool = require('../../../database/db');
const authorization = require('../../../middleware/authorization');
const bcrypt = require('bcrypt');
const checkPermission = require('../../../middleware/check-permissions');
const uploadImage = require('../../../lib/multer-image');
const fs = require('fs');

const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;
const EMAIL_REGEX =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

//todo //Decode the file name before using it to avoid language conversion problems
//* const decodedImagePath = decodeURIComponent(result.rows[0].image_path);
// Change instructor information

router.put(
  '/',
  authorization,
  uploadImage.single('image'),
  async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        email,
        education,
        birth_date,
        country,
        city,
        currentPassword,
        newPassword,
        verifyNewPassword,
      } = req.body;
      const instructor_id = req.user.userId;
      const roleId = req.user.roleId;
      //permission
      const hasAccess = await checkPermission(
        instructor_id,
        'updateSttingToInstructor',
        roleId,
      );
      if (!hasAccess) {
        return res.status(403).json('Access denied');
      }
      let query = '';
      let imageFilePath = null;

      //handling the password
      if (currentPassword) {
        const pass_query = 'SELECT password FROM Users WHERE user_id = $1';
        const { rows } = await pool.query(pass_query, [instructor_id]);
        if (rows.length === 0) {
          return res.status(404).json({ message: 'instructor not found' });
        }
        const storedPassword = rows[0].password;
        const validPassword = await bcrypt.compare(
          currentPassword,
          storedPassword,
        );

        if (!validPassword) {
          return res.status(402).json({ message: 'Invalid current password' });
        }
        //test the incoming inputs
        const result = PWD_REGEX.test(newPassword);
        if (!result) {
          return res.status(402).json({ message: 'New password is not valid' });
        }
        if (newPassword !== verifyNewPassword) {
          return res.status(402).json({ message: 'New password do not match' });
        }
        //تشفير
        const saltRound = 10;
        const newSalt = await bcrypt.genSalt(saltRound);
        const newBcryptPassword = await bcrypt.hash(newPassword, newSalt);
        //تعبئة
        query = `password = '${newBcryptPassword}',`;
      }

      //handling the image
      if (req.file && req.file.filename) {
        imageFilePath = encodeURIComponent(req.file.filename);
        query = `${query} picture = '${imageFilePath}',`;
      }

      //the rest of data
      //first checking the email is important
      if (!EMAIL_REGEX.test(email)) {
        return res.status(405).json({ message: 'Email is not valid' });
      }
      //second checking the first name
      if (!NAME_REGEX.test(first_name)) {
        return res.status(405).json({ message: 'first name is not valid' });
      }
      //lastly checking the last name
      if (!NAME_REGEX.test(last_name)) {
        return res.status(405).json({ message: 'last name is not valid' });
      }
      //we need to check date input because of an error
      if (DATE_REGEX.test(birth_date))
        query = `${query} birth_date = '${birth_date}',`;

      //continue with the rest of inputs
      query = `UPDATE Users
        SET ${query}
          first_name = '${first_name}', 
          last_name = '${last_name}',
          email = '${email}',
          education = '${education}',
          country = '${country}', 
          city = '${city}'
        WHERE user_id = '${instructor_id}';`;

      await pool.query(query);

      return res
        .status(201)
        .json({ message: 'Your information is updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },
);

// get instructor data
router.get('/', authorization, async (req, res) => {
  try {
    const Id = req.user.userId;
    const roleId = req.user.roleId;
    //permission
    const hasAccess = await checkPermission(
      Id,
      'updateSttingToInstructor',
      roleId,
    );
    if (!hasAccess) {
      return res.status(403).json('Access denied');
    }
    const query = 'SELECT * FROM Users WHERE user_id=$1';
    const values = [Id];
    const result = await pool.query(query, values);
    const row = result.rows[0];
    const data = {
      firstName: row.first_name,
      lastName: row.last_name,
      education: row.education,
      email: row.email,
      birthDate: row.birth_date,
      country: row.country,
      city: row.city,
      image: `http://localhost:5000/image/${row.picture}`,
    };
    res.status(200).json({
      reuslut: data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// remove image 
router.delete('/remove-image', authorization, async (req, res) => {
  try {
    const instructorId = req.user.userId;
    const roleId = req.user.roleId;
    // permission
    const hasAccess = await checkPermission(
      instructorId,
      'instructor_content_management',
      roleId,
    );
    if (!hasAccess) {
      return res.status(403).json('Access denied');
    }
    // 1- get image path from database by instructor id
     const result = await pool.query(
       'SELECT picture FROM users WHERE user_id = $1',
       [instructorId],
     );

     if (result.rows.length === 0) {
       return res.status(404).json({ message: 'User not found' });
     }

     const imagePath = `Upload/Images/${result.rows[0].picture}`;
     
    // 2- Verify that the path exists (if)
     if (!fs.existsSync(imagePath)) {
       return res.status(404).json({ message: 'File not found' });
     }
    // 3- Delete the image from file system
        fs.unlinkSync(imagePath);
    // 4- delete the image from database
        pool.query('UPDATE users SET picture = NULL WHERE user_id = $1', [
          instructorId,
        ]);
    // 5- send message success or error to frontend
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    console.error('Error when deleting Image :', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
