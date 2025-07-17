const router = require('express').Router();
const pool = require('../../../Database/db');
const authorization = require('../../../middleware/authorization');
const checkPermission = require('../../../middleware/check-permissions');

// API for getting detailed information about an instructor
router.get('/:instructorId', authorization, async (req, res) => {
  try {
    const supervisorId = req.user.userId;
    const roleId = req.user.roleId;
    const instructorId = req.params.instructorId;

    // Permission check
    const hasAccess = await checkPermission(
      supervisorId,
      'showAssigningRoadmaps',
      roleId,
    );

    if (!hasAccess) {
      return res.status(403).json('Access denied');
    }

    // Query to get instructor details
    const instructorDetailsQuery = `
      SELECT 
        u.first_name || ' ' || u.last_name AS full_name,
        u.email,
        u.birth_date,
        u.education,
        u.country,
        u.city,
        u.picture,
        u.role_id,
        (SELECT COUNT(*) FROM assigning_topics at WHERE at.instructor_id = u.user_id) AS assigned_topics_count,
        (SELECT COUNT(*) FROM course c WHERE c.instructor_id = u.user_id) AS created_courses_count
      FROM 
        users u
      WHERE 
        u.manager_id = $1
        AND u.user_id = $2
        AND (u.role_id = 1 OR u.role_id = 4);
    `;
    const instructorDetailsResult = await pool.query(instructorDetailsQuery, [
      supervisorId,
      instructorId,
    ]);

    if (instructorDetailsResult.rows.length === 0) {
      return res.status(404).json('Instructor not found');
    }

    // Prepare the JSON response
    const instructor = instructorDetailsResult.rows[0];
    const responseJSON = {
      fullName: instructor.full_name,
      email: instructor.email,
      birthDate: instructor.birth_date,
      education: instructor.education,
      country: instructor.country,
      city: instructor.city,
      picture: `http://localhost:5000/image/${instructor.picture}`,
      assignedTopicsCount: instructor.assigned_topics_count,
      createdCoursesCount: instructor.created_courses_count,
      status: instructor.role_id === 1 ? 'Active' : 'Blocked',
    };

    res.status(200).json(responseJSON);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});
router.put('/change-status/:instructorId', authorization, async (req, res) => {
  try {
    const supervisorId = req.user.userId;
    const roleId = req.user.roleId;
    const instructorId = req.params.instructorId;
    const { status } = req.body;

    // Permission check
    const hasAccess = await checkPermission(
      supervisorId,
      'showAssigningRoadmaps',
      roleId,
    );

    if (!hasAccess) {
      return res.status(403).json('Access denied');
    }

    let role_id;
    if (status === true) {
      role_id = 1;
    } else {
      role_id = 4;
    }

    const instructorStatusQuery = `
      UPDATE users
      SET role_id = $1
      WHERE user_id = $2;
    `;
    await pool.query(instructorStatusQuery, [role_id, instructorId]);

    // Prepare the JSON response
    res.status(200).json({ message: 'Instructor status updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
