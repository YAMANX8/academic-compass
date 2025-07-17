const express = require('express');
const router = express.Router();
const pool = require('../../../Database/db');
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
// new topic_level_n = data are topic_title,topic_description,topic_status,topic_level,top_level_topic_id,topic_order
// topic_order?
// top_level_topic_id => from top_level_topic_id we can get topic_level1_id
router.post(
  'newtopicLevelN/:previousTopic/:topicLevel',
  authorization,
  async (req, res) => {
    try {
      const supervisorId = req.user.userId;
      const roleId = req.user.roleId;
      const previousTopic = req.params.previousTopic;
      const topicLevel = parseInt(req.params.topicLevel);
      const { topic_title, topic_description, topic_status } = req.body;

      // Permission check
      const hasAccess = await checkPermission(
        supervisorId,
        'showAssigningRoadmaps',
        roleId,
      );

      if (!hasAccess) {
        return res.status(403).json('Access denied');
      }

      // Increment the topic level by 1 for the new topic
      const newTopicLevel = topicLevel + 1;

      // Get the next topic order automatically within the same topic level and previous topic
      let getOrderQuery;
      let getOrderValues;

      if (topicLevel === 1) {
        getOrderQuery = `
        SELECT COALESCE(MAX(topic_order), 0) + 1 AS next_order
        FROM topic_level_n
        WHERE topic_level1_id = $1
      `;
        getOrderValues = [previousTopic];
      } else {
        getOrderQuery = `
        SELECT COALESCE(MAX(topic_order), 0) + 1 AS next_order
        FROM topic_level_n
        WHERE top_level_topic_id = $1
      `;
        getOrderValues = [previousTopic];
      }

      const orderResult = await pool.query(getOrderQuery, getOrderValues);
      const nextOrder = orderResult.rows[0].next_order;

      // Insert new topic
      let addTopicQuery;
      let addTopicValues;

      if (topicLevel === 1) {
        addTopicQuery = `
        INSERT INTO topic_level_n (topic_title, topic_description, topic_status, topic_level, topic_level1_id, topic_order)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
        addTopicValues = [
          topic_title,
          topic_description,
          topic_status,
          newTopicLevel,
          previousTopic,
          nextOrder,
        ];
      } else {
        addTopicQuery = `
        INSERT INTO topic_level_n (topic_title, topic_description, topic_status, topic_level, top_level_topic_id, topic_order)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
        addTopicValues = [
          topic_title,
          topic_description,
          topic_status,
          newTopicLevel,
          previousTopic,
          nextOrder,
        ];
      }

      const addTopicResult = await pool.query(addTopicQuery, addTopicValues);

      // Response
      res.status(201).json({
        message: 'Topic added successfully',
        topic: addTopicResult.rows[0],
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server Error');
    }
  },
);

// topic_level_1 = data are topic_title,topic_description,topic_status
// topic_order?
// and her we need roadmap_id, category_id
router.post(
  '/newtopicLevel1/:roadmap_id/:topicLevel1Id',
  authorization,
  async (req, res) => {
    try {
      const supervisorId = req.user.userId;
      const roleId = req.user.roleId;
      const roadmap_id = req.params.roadmap_id;
      const topicLevel1Id = req.params.topicLevel1Id;
      const { topic_title, topic_description, topic_status, category_id } =
        req.body;

      // Permission check
      const hasAccess = await checkPermission(
        supervisorId,
        'showAssigningRoadmaps',
        roleId,
      );

      if (!hasAccess) {
        return res.status(403).json('Access denied');
      }

      // Get the next topic order automatically for the given roadmap and category
      const getOrderQuery = `
        SELECT COALESCE(MAX(topic_order), 0) + 1 AS next_order
        FROM topic_level_1
        WHERE roadmap_id = $1 
      `;
      const orderResult = await pool.query(getOrderQuery, [roadmap_id]);
      const nextOrder = orderResult.rows[0].next_order;

      // Insert new topic
      const addTopicQuery = `
        INSERT INTO topic_level_1 (topic_title, topic_description, topic_status, roadmap_id, topic_order, category_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
      const addTopicValues = [
        topic_title,
        topic_description,
        topic_status,
        roadmap_id,
        nextOrder,
        category_id,
      ];

      const addTopicResult = await pool.query(addTopicQuery, addTopicValues);

      // Response
      res.status(201).json({
        message: 'Topic added successfully',
        topic: addTopicResult.rows[0],
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server Error');
    }
  },
);

module.exports = router;
