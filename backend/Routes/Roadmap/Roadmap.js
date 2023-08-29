const router = require("express").Router();
const pool = require("../../Database/db");
const jwt = require("jsonwebtoken");
// Get all roadmaps
router.get("/", async (req, res) => {
  try {
    const queryResult = await pool.query("SELECT * FROM Roadmap");
    const decodedData = queryResult.rows.map((row) => {
      const decodedImagePath = decodeURIComponent(row.image_path);
      return {
        ...row,
        image_path: `http://localhost:5000/image/${decodedImagePath}`,
      };
    });

    res.status(200).json({
      status: "success",
      result: queryResult.rows.length,
      data: {
        dataresult: decodedData,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "An error occurred",
    });
  }
});

//* with login
router.get("/student/:id", async (req, res) => {
  try {
    const roadmapId = req.params.id;
    const jwtToken = req.header("token");
    if (!jwtToken) {
      // If there is no valid authentication (student is not authenticated)
      // Redirect the request to another API endpoint
      return res.redirect(
        `http://localhost:5000/AcademicCompass/roadmap/${roadmapId}`
      );
    } else {
      // Extract student ID from the token and proceed with your logic
      const payload = jwt.verify(jwtToken, process.env.jwtSecret);
      const studentId = payload.studentId;
       const query =
         "SELECT DISTINCT ON (r.roadmap_id) r.roadmap_id, r.roadmap_title, r.roadmap_description, t1.topic_level1_id, t1.topic_title, t1.topic_description, t1.topic_status, t1.topic_order, ps.progress_id, ps.student_id,  ps.state_id AS progress_state_id, ps.topic_id, ps.topic_level,  ts.state_name FROM Roadmap r JOIN Topic_Level_1 t1 ON r.roadmap_id = t1.roadmap_id LEFT JOIN Progress_Status ps ON t1.topic_level1_id = ps.topic_id AND ps.student_id = $1 LEFT JOIN Topic_States ts ON ps.state_id = ts.state_id WHERE r.roadmap_id = $2 ORDER BY r.roadmap_id, t1.topic_level1_id, ps.progress_id";
       const values = [studentId, roadmapId];
       const result = await pool.query(query, values);
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
      };

      const topics = result.rows.map((row) => ({
        topic_level1_id: row.topic_level1_id,
        topic_title: row.topic_title,
        topic_description: row.topic_description,
        topic_status: row.topic_status,
        topic_order: row.topic_order,
      }));

      const progressData = result.rows.map((row) => ({
        progress_id: row.progress_id,
        student_id: row.student_id,
        progress_state_id: row.progress_state_id,
        topic_id: row.topic_id,
        state_name: row.state_name,
      }));
      
      res.status(200).json({
        status: "success",
        roadmap: roadmapData,
        topics: topics,
        progress: progressData,
      });

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


