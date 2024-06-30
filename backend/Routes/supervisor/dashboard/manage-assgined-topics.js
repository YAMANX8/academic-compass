const router = require('express').Router();
const pool = require('../../../database/db');
const authorization = require('../../../middleware/authorization');
const checkPermission = require('../../../middleware/check-permissions');

// Get all topic level1 names with roadmap names
router.get('/topics-with-roadmaps', authorization, async (req, res) => {
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

    // Query to get all topic level1 names with roadmap names
    const query = `
      SELECT
        r.roadmap_id,
        r.roadmap_title,
        tl1.topic_level1_id,
        tl1.topic_title
      FROM
        roadmap r
      LEFT JOIN
        topic_level_1 tl1 ON r.roadmap_id = tl1.roadmap_id;
    `;
    const result = await pool.query(query);

    // Organize data into the desired structure
    const roadmaps = {};
    result.rows.forEach((row) => {
      if (!roadmaps[row.roadmap_id]) {
        roadmaps[row.roadmap_id] = {
          roadmap_id: row.roadmap_id,
          roadmap_title: row.roadmap_title,
          topics: [],
        };
      }
      if (row.topic_level1_id) {
        roadmaps[row.roadmap_id].topics.push({
          topic_level1_id: row.topic_level1_id,
          topic_title: row.topic_title,
        });
      }
    });

    // Convert the roadmaps object into an array
    const responseJSON = Object.values(roadmaps);

    res.status(200).json(responseJSON);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

// Get assigning topics
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

    // Query to get assigning topics
    const assigningTopicsQuery = `
      SELECT 
        a.topic_level1_id,
        tl1.topic_title
      FROM 
        assigning_topics a
        LEFT JOIN Topic_Level_1 tl1 ON a.topic_level1_id = tl1.topic_level1_id
      WHERE 
        a.instructor_id = $1;
    `;
    const assigningTopicsResult = await pool.query(assigningTopicsQuery, [
      instructorId,
    ]);

    // Create JSON response
    const responseJSON = assigningTopicsResult.rows.map((row) => ({
      topic_level1_id: row.topic_level1_id,
      topic_title: row.topic_title,
    }));

    res.status(200).json(responseJSON);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

// Add assigning topics => instructor_id,topic_level1_id
// * You can use this info Yaman 
// * here I'm returning new topic_level1_id after inserting 
router.post('/:instructorId', authorization, async (req, res) => {
  try {
    const supervisorId = req.user.userId;
    const roleId = req.user.roleId;
    const instructorId = req.params.instructorId;
    const { topic_level1_id } = req.body;

    // Permission check
    const hasAccess = await checkPermission(
      supervisorId,
      'showAssigningRoadmaps',
      roleId,
    );

    if (!hasAccess) {
      return res.status(403).json('Access denied');
    }

    // Query to add assigning topic
    const addTopicQuery = `
      INSERT INTO assigning_topics (instructor_id, topic_level1_id)
      VALUES ($1, $2)
      RETURNING topic_level1_id;
    `;
    const addTopicResult = await pool.query(addTopicQuery, [
      instructorId,
      topic_level1_id,
    ]);

    res.status(201).json({
      message: 'Topic assigned successfully',
      topic_level1_id: addTopicResult.rows[0].topic_level1_id,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

// Remove assigning topics
router.delete(
  '/:instructorId/:topic_level1_id',
  authorization,
  async (req, res) => {
    try {
      const supervisorId = req.user.userId;
      const roleId = req.user.roleId;
      const instructorId = req.params.instructorId;
      const topicLevel1Id = req.params.topic_level1_id;

      // Permission check
      const hasAccess = await checkPermission(
        supervisorId,
        'showAssigningRoadmaps',
        roleId,
      );

      if (!hasAccess) {
        return res.status(403).json('Access denied');
      }

      // Query to remove assigning topic
      const removeTopicQuery = `
      DELETE FROM assigning_topics 
      WHERE instructor_id = $1 AND topic_level1_id = $2;
    `;
      const removeTopicResult = await pool.query(removeTopicQuery, [
        instructorId,
        topicLevel1Id,
      ]);

      if (removeTopicResult.rowCount === 0) {
        return res.status(404).json('Topic not found');
      }

      res.status(200).json({
        message: 'Topic removed successfully'
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server Error');
    }
  },
);

module.exports = router;
