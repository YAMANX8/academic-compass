const router = require("express").Router();
const pool = require("../../../Database/db");
const authorization = require("../../../middleware/authorization.js");
// const checkPermission=require('../middleware/checkPermissions.js')

router.get("/", authorization, async (req, res) => {
  try {
    //get information to student
    const studentInfo = await pool.query(
      "SELECT * FROM student WHERE student_id = $1",
      [req.student.studentId]
    );
    res.json({
      studentInfo: studentInfo.rows[0],
    });

    // get Info about courses count
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
