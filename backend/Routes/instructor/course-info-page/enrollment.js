const router = require('express').Router();
const pool = require('../../../database/db');
const checkPermission = require('../../../middleware/check-permissions');
const authorization = require('../../../middleware/authorization');

router.get('/:courseId', authorization, async (req, res) => {
  try {
    const instructorId = req.user.userId;
    const roleId = req.user.roleId;
    const courseId = req.params.courseId;

    // Permission check
    const hasAccess = await checkPermission(
      instructorId,
      'showCourseInfoPage',
      roleId,
    );

    if (!hasAccess) {
      return res.status(403).json('Access denied');
    }

    const show_enrollment_query = `
      SELECT
        student.student_id AS id,
        student.first_name,
        student.last_name,
        student.picture,
        enrollment.strting_date AS enroll_date,
        student.country,
        course.course_title
      FROM
        course
      JOIN enrollment ON course.course_id = enrollment.course_id
      JOIN student ON enrollment.student_id = student.student_id
      WHERE
      course.course_id = $1;
    `;

    const show_enrollment_result = await pool.query(show_enrollment_query, [
      courseId
    ]);

    // تنظيم النتائج في الشكل المطلوب
    const enrollmentData = show_enrollment_result.rows.map((row) => ({
      id: row.id,
      first_name: row.first_name,
      last_name: row.last_name,
      picture: `http://localhost:5000/image/${row.picture}`,
      enroll_date: row.enroll_date,
      country: row.country,
      course_title: row.course_title,
    }));

    res.status(200).json(enrollmentData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
