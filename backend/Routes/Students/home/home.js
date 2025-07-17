const router = require('express').Router();
const pool = require('../../../Database/db');
const popularRoadmaps = require('../../../Utils/dashboard/popular-roadmaps');

router.get('/', async (req, res) => {
  try {
    const enrollment = await pool.query(`
      SELECT
        COUNT(*)
      FROM
        Enrollment
    `);
    const roadmap = await pool.query(`
      SELECT
        COUNT(*)
      FROM
        roadmap
    `);
    const course = await pool.query(`
      SELECT
        COUNT(*)
      FROM
        course
    `);
    const instructor = await pool.query(`
      SELECT
        COUNT(*)
      FROM
        users
      WHERE
        role_id = 1
    `);
    const popularRoadmap = await popularRoadmaps.popularRoadmapsInfo();
    const responseData = {
      status: {
        enrollments: enrollment.rows[0],
        roadmaps: roadmap.rows[0],
        courses: course.rows[0],
        instructors: instructor.rows[0],
      },
      popularRoadmaps: popularRoadmap.Data.data,
    };
    res.status(200).json(responseData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 'error',
      message: 'A server error has occurred. Please try again later.',
    });
  }
});

module.exports = router;
