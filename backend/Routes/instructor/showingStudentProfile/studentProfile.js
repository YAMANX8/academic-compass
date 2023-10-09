const router = require("express").Router();
const pool = require("../../../Database/db");
const checkPermission = require("../../../middleware/checkPermissions");
const authorization = require("../../../middleware/authorization");
router.get("/:studentId", authorization, async (req, res) => {
  try {
    const Id = req.params.studentId;
    const roleId = req.user.roleId;
    //permission
    const hasAccess = await checkPermission(Id, "showStudentProfile", roleId);
    if (!hasAccess) {
      return res.status(403).json("Access denied");
    }
    const query = `SELECT * FROM student WHERE student_id =$1 `;
    const value = [Id];
    const result = await pool.query(query, value);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
