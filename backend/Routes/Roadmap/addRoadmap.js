const router = require("express").Router();
const pool = require("../../Database/db");
const multer = require("multer");

// ! add image_path column to roadmap.
// ? how to add column
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
    const{title}=req.body;
    const imageFilePath = req.file.path;
    console.log(imageFilePath);
    await pool.query("SET client_encoding TO 'UTF8';");
    const newRodmapInfo = await pool.query(
      "INSERT INTO roadmap  ( roadmap_title,image_path) VALUES ($1,$2) RETURNING *",
      [title,imageFilePath]
    );
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
