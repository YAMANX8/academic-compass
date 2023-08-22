const router = require("express").Router();
const pool = require("../../../Database/db");


// * we don't need authorization in home page
router.get("/", async (req, res) => {
  try {
    //get information to home page
    const enrollment = await pool.query("SELECT COUNT(*) FROM Enrollment ");
    const roadmap = await pool.query("SELECT COUNT(*) FROM roadmap ");
    const course = await pool.query("SELECT COUNT(*) FROM course ");
    const instructer = await pool.query(
      "SELECT COUNT(*) FROM users WHERE role_id=1"
    );
    // todo here we need to select popular roadmap and make a function to that
    const allRoadmap = await pool.query("SELECT * FROM Roadmap");
    res.json({
      count: {
        enrollment: enrollment.rows[0],
        roadmap: roadmap.rows[0],
        course: course.rows[0],
        instructer: instructer.rows[0],
      },
      roadmaps: allRoadmap.rows,
    });

    // get Info about courses count
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;