const router = require("express").Router();
const pool = require("../../../Database/db");
const multer = require("multer");
const path = require("path");
const authorization = require("../../../middleware/authorization");
const bcrypt = require("bcrypt");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Upload/Images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});
const upload = multer({ storage: storage });
const PWD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,24}$/;
const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//todo // فك ترميز اسم الملف قبل استخدامه لتجنب مشاكل تحويل اللغة
//* const decodedImagePath = decodeURIComponent(result.rows[0].image_path);
// Change student information
router.put("/", authorization, upload.single("image"), async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      education,
      birth_date,
      bio,
      country,
      city,
      currentPassword,
      newPassword,
      verifyNewPassword,
    } = req.body;
    const student_id = req.student.studentId;
    let query = "";
    let imageFilePath = null;
    let result = false;

    //handling the password
    if (currentPassword) {
      const pass_query = "SELECT password FROM student WHERE student_id = $1";
      const { rows } = await pool.query(pass_query, [student_id]);
      if (rows.length === 0) {
        return res.status(404).json({ message: "Student not found" });
      }
      const storedPassword = rows[0].password;
      const validPassword = await bcrypt.compare(
        currentPassword,
        storedPassword
      );

      if (!validPassword) {
        return res.status(401).json({ message: "Invalid current password" });
      }
      //test the incoming inputs
      const result = PWD_REGEX.test(newPassword);
      if (!result) {
        return res.status(402).json({ message: "New password is not valid" });
      }
      if (newPassword !== verifyNewPassword) {
        return res.status(400).json({ message: "New passwords do not match" });
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
    result = EMAIL_REGEX.test(email);
    if (!result) {
      return res.status(405).json({ message: "Email is not valid" });
    }
    //second checking the first name
    result = NAME_REGEX.test(first_name);
    if (!result) {
      return res.status(405).json({ message: "first name is not valid" });
    }
    //lastly checking the last name
    result = NAME_REGEX.test(last_name);
    if (!result) {
      return res.status(405).json({ message: "last name is not valid" });
    }

    query = `UPDATE student
        SET ${query}
          first_name = '${first_name}', 
          last_name = '${last_name}',
          email = '${email}',
          education = '${education}',
          birth_date = '${birth_date}',
          bio = '${bio}',
          country = '${country}', 
          city = '${city}'
        WHERE student_id = '${student_id}';`;

    await pool.query(query);

    return res
      .status(201)
      .json({ message: "Your information is updated successfuly" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

// get student data
router.get("/", authorization, async (req, res) => {
  try {
    const Id = req.student.studentId;
    const query = "SELECT * FROM student WHERE student_id=$1";
    const values = [Id];
    const result = await pool.query(query, values);
    const row = result.rows[0];
    const data = {
      firstName: row.first_name,
      lastName: row.last_name,
      education: row.education,
      email: row.email,
      bio: row.bio,
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
    res.status(500).send("Server Error");
  }
});

module.exports = router;
