const router = require('express').Router();
const pool = require('../../../Database/db');
const authorization = require('../../../middleware/authorization');

// Change student information
router.put('/', authorization, async (req, res) => {
  try {
    const { first_name, last_name, email, education, birth_date, bio } =
      req.body;
    // const student_id = req.params.id;
    const student_id = req.student.student_id;
    const query = `UPDATE student
        SET first_name = $1,
            last_name = $2,
            email = $3,
            education = $4,
            birth_date = $5,
            bio = $6
        WHERE student_id = $7;`;
    // updateAccount query
    await pool.query(query, [
      first_name,
      last_name,
      email,
      education,
      birth_date,
      bio,
      student_id,
    ]);
    return res.status(201).json({ message: 'Acount Updated' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.get('/getInfo', authorization, async (req, res) => {
  try {
    // const Id=req.params.id;
    const Id = req.student.studentId;
    const query = 'SELECT * FROM student WHERE student_id=$1';
    const values = [Id];
    const result = await pool.query(query, values);
    const decodedData = result.rows.map((row) => {
      const decodedImagePath = decodeURIComponent(row.image_path);
      return {
        ...row,
        image_path: decodedImagePath,
      };
    });
    res.status(201).json({
      status: 'success',
      reuslut: result.rows.length,
      Data: {
        data: decodedData,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
