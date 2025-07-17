const router = require('express').Router();
const pool = require('../../../Database/db');
const authorization = require('../../../middleware/authorization');
const checkPermission = require('../../../middleware/check-permissions');

// API for getting assigned roadmaps
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

    // Query to get assigning roadmaps
    const assigningRoadmapsQuery = `
      SELECT 
        r.roadmap_title AS "ROADMAP_NAME",
        r.image_path AS "IMAGE_PATH",
        u2.user_id AS "SUPERVISOR_ID",
        u2.first_name || ' ' || u2.last_name AS "SUPERVISOR_NAME"
      FROM 
        roadmap r
      JOIN 
        Managing_Roadmaps mr ON r.roadmap_id = mr.roadmap_id
      JOIN 
        users u ON mr.employee_id = u.user_id
      JOIN 
        Managing_Roadmaps mr2 ON r.roadmap_id = mr2.roadmap_id
      JOIN 
        users u2 ON mr2.employee_id = u2.user_id
      WHERE 
        u.role_id = 3
      GROUP BY 
        r.roadmap_title, r.image_path, u2.user_id, u2.first_name, u2.last_name
      ORDER BY 
        r.roadmap_title, u2.user_id;
    `;

    const assigningRoadmapsResult = await pool.query(assigningRoadmapsQuery);

    // Process the results into the desired JSON structure
    const roadmaps = {};

    assigningRoadmapsResult.rows.forEach((row) => {
      if (!roadmaps[row.ROADMAP_NAME]) {
        roadmaps[row.ROADMAP_NAME] = {
          roadmapName: row.ROADMAP_NAME,
          imagePath: row.IMAGE_PATH,
          assigningSupervisors: [],
        };
      }
      roadmaps[row.ROADMAP_NAME].assigningSupervisors.push(row.SUPERVISOR_NAME);
    });

    const responseJSON = Object.values(roadmaps);

    res.status(200).json(responseJSON);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
