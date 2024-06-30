const express = require('express');
const router = express.Router();
const pool = require('../../../database/db');
const authorization = require('../../../middleware/authorization');
const checkPermission = require('../../../middleware/check-permissions');

// Get all topics by roadmap_id
router.get('/:roadmapId', authorization, async (req, res) => {
  try {
    const supervisorId = req.user.userId;
    const roleId = req.user.roleId;
    const roadmapId = req.params.roadmapId;

    // Permission check
    const hasAccess = await checkPermission(
      supervisorId,
      'showAssigningRoadmaps',
      roleId,
    );

    if (!hasAccess) {
      return res.status(403).json('Access denied');
    }

    // Query to get all topics
    const query = `
      SELECT 
        tl1.topic_level1_id, 
        tl1.topic_title as topic_level1_title,
        tl1.topic_order as topic_level1_order,
        tl2.topic_id, 
        tl2.topic_title as topic_level2_title,
        tl2.topic_level,
        tl2.top_level_topic_id,
        tl2.topic_order as topic_level2_order,
        tl3.topic_id as topic_level3_id,
        tl3.topic_title as topic_level3_title,
        tl3.topic_level as topic_level3,
        tl3.top_level_topic_id as topic_level3_top_id,
        tl3.topic_order as topic_level3_order
      FROM 
        topic_level_1 tl1
      LEFT JOIN 
        topic_level_n tl2 ON tl1.topic_level1_id = tl2.topic_level1_id AND tl2.topic_level = 2
      LEFT JOIN 
        topic_level_n tl3 ON tl2.topic_id = tl3.top_level_topic_id AND tl3.topic_level = 3
      WHERE 
        tl1.roadmap_id = $1
      ORDER BY 
        tl1.topic_order, tl2.topic_order, tl3.topic_order;
    `;
    const result = await pool.query(query, [roadmapId]);

    // Organize data into the desired structure
    const topics = {};
    result.rows.forEach((row) => {
      if (!topics[row.topic_level1_id]) {
        topics[row.topic_level1_id] = {
          topic_level1_id: row.topic_level1_id,
          topic_level1_title: row.topic_level1_title,
          topic_level_2: [],
        };
      }

      if (row.topic_id) {
        let parentTopic = topics[row.topic_level1_id].topic_level_2.find(
          (topic) => topic.topic_id === row.topic_id,
        );
        if (!parentTopic) {
          parentTopic = {
            topic_id: row.topic_id,
            topic_level2_title: row.topic_level2_title,
            topic_level: row.topic_level,
            topic_level_3: [],
          };
          topics[row.topic_level1_id].topic_level_2.push(parentTopic);
        }
        if (row.topic_level3_id) {
          parentTopic.topic_level_3.push({
            topic_id: row.topic_level3_id,
            topic_level3_title: row.topic_level3_title,
            topic_level: row.topic_level3,
          });
        }
      }
    });

    // Convert the topics object into an array
    const responseJSON = Object.values(topics);

    res.status(200).json(responseJSON);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

// post new topic
// topic_level +1 from previous topic_level
// new topic_level_n = data are topic_title,topic_description,topic_status
// topic_order?
// top_level_topic_id => from top_level_topic_id we can get topic_level1_id


// topic_level_1 = data are topic_title,topic_description,topic_status
// topic_order?
// and her we need roadmap_id, category_id

module.exports = router;
