const router = require("express").Router();
const pool = require("../../Database/db");
const authorization = require("../../middleware/authorization.js");
// const checkPermission=require('../middleware/checkPermissions.js')

router.get("/", authorization, async (req, res) => {
  try {
    //req.user has the payload
    // res.json(req.student);

    // const hasAccess = await checkPermission(req.user, "dashboard_access");
    // if (!hasAccess) {
    //     return res.status(403).json("Access denied");
    //   }

    const user = await pool.query(
      "SELECT * FROM student WHERE student_id = $1",
      [req.student.studentId]
    );
    res.json({
      user: user.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
