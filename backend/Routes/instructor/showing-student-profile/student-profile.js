const router = require('express').Router();
const pool = require('../../../database/db');
const checkPermission = require('../../../middleware/check-permissions');
const authorization = require('../../../middleware/authorization');

const GetTotalPoint = async (student_id) => {
  try {
    const query = `
      WITH
        PointsPerEnrollment AS (
          SELECT
            e.enrollment_id,
            SUM(
              CASE
                WHEN o.is_correct THEN 1
                ELSE 0
              END
            ) AS points
          FROM
            enrollment e
            INNER JOIN Student_Answers sa ON e.enrollment_id = sa.enrollment_id
            LEFT JOIN course c ON e.course_id = c.course_id
            LEFT JOIN items i ON c.course_id = i.item_id
            LEFT JOIN quiz q ON i.item_id = q.quiz_id
            INNER JOIN Option o ON sa.option_no = o.option_no
            AND sa.question_no = o.question_id
          WHERE
            e.student_id = $1
          GROUP BY
            e.enrollment_id
        )
      SELECT
        SUM(points) AS total_points
      FROM
        PointsPerEnrollment
    `;
    const values = [student_id];
    const result = await pool.query(query, values);
    return result.rows[0].total_points || 0;
  } catch (error) {
    console.error('Error Get TotalPoint', error);
    return 0;
  }
};

router.get('/:studentId', authorization, async (req, res) => {
  try {
    const Id = req.params.studentId;
    const instructorId = req.user.userId;
    const roleId = req.user.roleId;

    // Check permission
    const hasAccess = await checkPermission(
      instructorId,
      'showCourseInfoPage',
      roleId,
    );
    if (!hasAccess) {
      return res.status(403).json('Access denied');
    }

    // Query student information
    const studentQuery = `
      SELECT
        student_id,
        first_name,
        last_name,
        email,
        education,
        country,
        city,
        birth_date,
        bio,
        picture
      FROM
        student
      WHERE
        student_id = $1
    `;
    const studentValue = [Id];
    const studentResult = await pool.query(studentQuery, studentValue);

    // Query number of courses
    const coursesQuery = `
      SELECT
        COUNT(*) AS courses_count
      FROM
        enrollment
      WHERE
        student_id = $1
    `;
    const coursesValue = [Id];
    const coursesResult = await pool.query(coursesQuery, coursesValue);
    const coursesCount = coursesResult.rows[0].courses_count;

    // Get total points
    const totalPoints = await GetTotalPoint(Id);

    // Response
    const response = studentResult.rows.map((row) => ({
      id: row.student_id,
      first_name: row.first_name,
      last_name: row.last_name,
      email: row.email,
      education: row.education,
      country: row.country,
      city: row.city,
      birth_date: row.birth_date,
      bio: row.bio,
      picture: `http://localhost:5000/image/${row.picture}`,
      courses_count: coursesCount,
      total_points: totalPoints,
    }));
    res.status(200).json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
