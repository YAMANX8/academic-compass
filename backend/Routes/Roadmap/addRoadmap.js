const router = require("express").Router();
const pool = require("../../Database/db");
const multer = require("multer");
const path=require("path");
// * Add a unique name for file
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


router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageFilePath = encodeURIComponent(req.file.filename);
    // Insert into the database
    const newRodmapInfo = await pool.query(
      "INSERT INTO roadmap  ( roadmap_title,roadmap_description,image_path) VALUES ($1,$2,$3) RETURNING *",
      [title, description, imageFilePath]
    );
    // Build response
    const newRoadmapInfo = {
      roadmap_id: newRodmapInfo.rows[0].roadmap_id,
      roadmap_title: newRodmapInfo.rows[0].roadmap_title,
      roadmap_description: newRodmapInfo.rows[0].roadmap_description,
      image_path: `http://localhost:5000/image/${newRodmapInfo.rows[0].image_path}`,
    };

    res.json(newRoadmapInfo);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
