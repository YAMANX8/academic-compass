const router = require("express").Router();
const pool = require("../../Database/db");
router.get("/", async (req, res) => {
  try {
    const queryreuslut = await pool.query("SELECT * FROM Roadmap");
    const decodedData = queryreuslut.rows.map((row) => {
      const decodedImagePath = decodeURIComponent(row.image_path);
      return {
        ...row,
        image_path: `http://localhost:5000/image/${decodedImagePath}`,
      };
    });
    res.status(200).json({
      status: "success",
      reuslut: queryreuslut.rows.length,
      data: {
        datareuslt: decodedData,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//* with login
router.get("/student", async (req, res) => {
  try {
    const jwtToken = req.header("token");
    if (!jwtToken) {
      // If there is no valid authentication (student is not authenticated)
      // Redirect the request to another API endpoint
      return res.redirect("http://localhost:5000/AcademicCompass/roadmap/:id");
    } else {
      // Extract student ID from the token and proceed with your logic
      const payload = jwt.verify(jwtToken, process.env.jwtSecret);
      const studentId = payload.studentId;
      // todo write query with login
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "An error occurred",
    });
  }
});

//* without login
router.get("/:id", async (req, res) => {
  try {
    const roadmap_id = req.params.id;
    const query =
      "SELECT roadmap.*, topic_level_1.* FROM roadmap LEFT JOIN topic_level_1 ON roadmap.roadmap_id = topic_level_1.roadmap_id WHERE roadmap.roadmap_id = $1";
    const result = await pool.query(query, [roadmap_id]);

    if (result.rows.length === 0) {
      res.status(404).json({
        status: "error",
        message: "Roadmap not found",
      });
      return;
    }
    const roadmapData = {
      roadmap_id: result.rows[0].roadmap_id,
      roadmap_title: result.rows[0].roadmap_title,
      roadmap_description: result.rows[0].roadmap_description,
      image_path: `http://localhost:5000/image/${decodeURIComponent(
        result.rows[0].image_path
      )}`,
    };

    const topics = result.rows
      .filter((row) => row.topic_level1_id !== null) // Filter out rows with null topic IDs
      .map((row) => ({
        topic_level1_id: row.topic_level1_id,
        topic_title: row.topic_title,
        topic_description: row.topic_description,
        topic_status: row.topic_status,
        topic_order: row.topic_order,
      }));

    res.status(200).json({
      status: "success",
      roadmap: roadmapData,
      topics: topics,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "An error occurred",
    });
  }
});


module.exports = router;
