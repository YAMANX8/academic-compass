const router = require('express').Router();
const pool = require('../../../Database/db');
const authorization = require('../../../middleware/authorization');
const checkPermission = require('../../../middleware/check-permissions');

// API for getting instructors under a specific supervisor || We are missing status
router.get('/', authorization, async (req, res) => {
  try {
    const supervisorId = req.user.userId;
    const roleId = req.user.roleId;

    // Permission check
    const hasAccess = await checkPermission(
      supervisorId,
      'showAssigningRoadmaps',
      roleId,
    );

    if (!hasAccess) {
      return res.status(403).json('Access denied');
    }

    // Query to get instructors
    const instructorsQuery = `
      SELECT 
        u.user_id,
        u.first_name || ' ' || u.last_name AS full_name,
        u.birth_date AS joining_date,
        u.country,
        u.picture,
        u.role_id
      FROM 
        users u
      WHERE 
        u.manager_id = $1
        AND (u.role_id = 1 OR u.role_id = 4);
    `;
    const instructorsResult = await pool.query(instructorsQuery, [
      supervisorId,
    ]);

    // Create JSON response
    const responseJSON = instructorsResult.rows.map((row) => ({
      userId:row.user_id,
      fullName: row.full_name,
      joiningDate: row.joining_date,
      country: row.country,
      picture: `http://localhost:5000/image/${row.picture}`,
      status: row.role_id === 1 ? 'Active' : 'Blocked',
    }));

    res.status(200).json(responseJSON);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
