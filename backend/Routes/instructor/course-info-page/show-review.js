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

    // Query to fetch reviews for a specific course along with the course title
    const show_review_query = `
      SELECT
        Course.course_title,
        Student.student_id AS id,
        Rating.rating_id,
        Student.first_name,
        Student.last_name,
        Student.picture,
        Rating.stars_number,
        Rating.review
      FROM
        Course
        JOIN Enrollment ON Course.course_id = Enrollment.course_id
        JOIN Student ON Enrollment.student_id = Student.student_id
        JOIN Rating ON Enrollment.enrollment_id = Rating.enrollment_id
      WHERE
        Course.course_id = $1;
    `;

    const show_review_result = await pool.query(show_review_query, [courseId]);

    if (show_review_result.rows.length === 0) {
      return res.status(404).json('Course not found or no reviews available');
    }

    // Assuming you have a specific date for demonstration
    const date = '05-05-2023';

    // Extract course title from the first row
    const courseTitle = show_review_result.rows[0].course_title;

    // Formatting the result
    const reviews = show_review_result.rows.map((row) => ({
      id: row.id,
      fname: row.first_name,
      lname: row.last_name,
      stars: row.stars_number,
      img: `http://localhost:5000/image/${row.picture}`,
      date: date,
      comment: row.review,
    }));

    const responseData = {
      course_title: courseTitle,
      reviews: reviews,
    };

    res.status(200).json(responseData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
