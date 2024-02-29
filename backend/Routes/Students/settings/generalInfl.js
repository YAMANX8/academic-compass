const router = require('express').Router();
const pool = require('../../../Database/db');
const multer = require('multer');
const authorization = require('../../../middleware/authorization');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Upload/Images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//todo // فك ترميز اسم الملف قبل استخدامه لتجنب مشاكل تحويل اللغة
//* const decodedImagePath = decodeURIComponent(result.rows[0].image_path);
router.put(
  '/addGeneralInfo',
  authorization,
  upload.single('image'),
  async (req, res) => {
    try {
      // const Id = req.params.id;
      const Id = req.student.studentId;
      const { country, city } = req.body;
      const imageFilePath = encodeURIComponent(req.file.path);
      console.log(imageFilePath);
      const newStudentInfo = await pool.query(
        'UPDATE student SET country = $1, city=$2, picture=$3 WHERE student_id = $4',

        [country, city, imageFilePath, Id],
      );

      res.status(201).json(newStudentInfo.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  },
);

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
