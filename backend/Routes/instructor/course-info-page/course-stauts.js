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

    // First query: Total item count for a specific course
    const itemQuery = `
      SELECT
        COUNT(items.item_id) AS item_count
      FROM
        Course
        JOIN items ON course.course_id = items.course_id
      WHERE
        course.course_id = $1
    `;
    const itemResult = await pool.query(itemQuery, [courseId]);
    const totalItemCount = itemResult.rows[0].item_count;

    // Second query: Total enrollments for a specific course
    const enrollmentQuery = `
      SELECT
        COUNT(enrollment.enrollment_id) AS total_enrollments
      FROM
        Course
        LEFT JOIN Enrollment ON Course.course_id = Enrollment.course_id
      WHERE
        Course.course_id = $1
    `;
    const enrollmentResult = await pool.query(enrollmentQuery, [courseId]);
    const totalEnrollments = enrollmentResult.rows[0].total_enrollments;

    // Third query: Total reviews for a specific course
    const reviewQuery = `
      SELECT
        COUNT(rating.rating_id) AS total_reviews
      FROM
        Course
        LEFT JOIN Enrollment e ON Course.course_id = e.course_id
        LEFT JOIN rating ON e.enrollment_id = rating.enrollment_id
      WHERE
        Course.course_id = $1
    `;
    const reviewResult = await pool.query(reviewQuery, [courseId]);
    const totalReviews = reviewResult.rows[0].total_reviews;

    // Fourth query: Average ratings for a specific course
    const avgRatingQuery = `
      SELECT
        AVG(rating.stars_number) AS average_rating
      FROM
        Course
        LEFT JOIN Enrollment e ON Course.course_id = e.course_id
        LEFT JOIN rating ON e.enrollment_id = rating.enrollment_id
      WHERE
        Course.course_id = $1
    `;
    const avgRatingResult = await pool.query(avgRatingQuery, [courseId]);
    const averageRating = avgRatingResult.rows[0].average_rating;

    // Create JSON response
    const responseJSON = {
      items: totalItemCount,
      enrollments: totalEnrollments,
      reviews: totalReviews,
      average_rating: averageRating
        ? parseFloat(averageRating).toFixed(2)
        : null, // Formatting the average rating to 2 decimal places
    };

    res.status(200).json(responseJSON);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
