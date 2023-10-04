const express = require("express");
const router = express.Router();
const pool = require("../../Database/db"); // تستدعي هنا ملف الاتصال بقاعدة البيانات

// نهاية API لجلب كل بيانات register_request
router.get("/register_requests", async (req, res) => {
  try {
    const query = "SELECT * FROM register_request";
    const result = await pool.query(query);

    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
