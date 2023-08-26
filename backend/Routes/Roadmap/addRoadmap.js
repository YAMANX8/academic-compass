const router = require("express").Router();
const pool = require("../../Database/db");
const multer = require("multer");
// * this api is not completed
//add resume file to disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Upload/Images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title,description } = req.body;
    const imageFilePath = encodeURIComponent(req.file.path);
    console.log(imageFilePath);
    const newRodmapInfo = await pool.query(
      "INSERT INTO roadmap  ( roadmap_title,roadmap_description,image_path) VALUES ($1,$2,$3) RETURNING *",
      [title, description, imageFilePath]
    );

    res.json(newRodmapInfo.rows[0]);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
