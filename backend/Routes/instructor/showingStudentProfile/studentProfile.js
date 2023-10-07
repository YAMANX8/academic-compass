const router = require("express").Router();
const pool = require("../../../Database/db");

router.get("/:studentId", async (req, res) => {
  try {
    const Id=req.params.studentId
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
