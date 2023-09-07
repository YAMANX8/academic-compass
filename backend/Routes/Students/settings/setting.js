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

//todo // فك ترميز اسم الملف قبل استخدامه لتجنب مشاكل تحويل اللغة
//* const decodedImagePath = decodeURIComponent(result.rows[0].image_path);
// Change student information
router.put('/',authorization,  upload.single("image"), async (req, res) => {
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
    //password
    const pass_query = "SELECT password FROM student WHERE student_id = $1";
    const { rows } = await pool.query(pass_query, [student_id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    // todo here we need to compare bcrypt password
    const storedPassword = rows[0].password;

    const validPassword = await bcrypt.compare(currentPassword, storedPassword);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    if (newPassword !== verifyNewPassword) {
      return res.status(400).json({ message: "New passwords do not match" });
    }
    const saltRound = 10;
    const newSalt = await bcrypt.genSalt(saltRound);
    const newBcryptPassword = await bcrypt.hash(newPassword, newSalt);
    //image
    const imageFilePath = encodeURIComponent(req.file.filename);
    console.log(imageFilePath);
    const query = `UPDATE student
        SET first_name = $1,
            last_name = $2,
            email = $3,
            education = $4,
            birth_date = $5,
            bio = $6,
            country = $7,
            city = $8,
            password=$9,
            picture=$10
        WHERE student_id = $11;`;

    const values = [
      first_name,
      last_name,
      email,
      education,
      birth_date,
      bio,
      country,
      city,
      newBcryptPassword,
      imageFilePath,
      student_id,
    ];
    const updateAccount = await pool.query(query, values);
    return res.status(201).json({ message: "Acount is Updated" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


// get student data
router.get("/",authorization, async (req, res) => {
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
      email: router.email,
      bio: row.bio,
      birthDate: row.birth_date,
      country: row.country,
      city: row.city,
      image: `http://localhost:5000/image/${row.picture}`
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
