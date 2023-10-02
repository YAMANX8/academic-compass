const router = require("express").Router();
const db = require("../../Database/db");
const jwt = require("jsonwebtoken");
const checkPermission = require("../../middleware/checkPermissions");
const authorization = require("../../middleware/authorization");

router.post('/', authorization, async (req, res) => {
  try {
    const { stars_number, review, enrollment_id, courseId } = req.body;
    //permission
    // todo نضيق صلاحية لإضافة كورس للطالب
    // const hasAccess = await checkPermission(studentId, "update_stting");
    // if (!hasAccess) {
    //   return res.status(403).json("Access denied");
    // }
    const checkEnrollmentQuery = `
      SELECT course_id, enrollment_id
      FROM enrollment
      WHERE course_id = '${courseId}' AND enrollment_id = '${enrollment_id}';
      `;
    const { rows } = await db.query(checkEnrollmentQuery);
    console.log(rows)
    if (rows.length !== 0) {
      const insertRtingQuery = `
        INSERT INTO Rating (stars_number , review , enrollment_id)
        VALUES ($1, $2, $3)`;

      const values = [
        stars_number,
        review,
        enrollment_id,
      ];

      const result = await db.query(insertRtingQuery, values);

      res.status(200).json({ rating: "Rating Added" });
    } else {
      return res.status(401).json({ message: "You Didn't Enroll This Course" });
    }
  } catch (err) {
    console.error('Error inserting review:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});


module.exports = router;
