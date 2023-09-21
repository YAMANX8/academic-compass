    const router = require("express").Router();
    const pool = require("../../Database/db");
    const authorization = require("../../middleware/authorization");

    router.get("/:courseId/:itemID", authorization, async (req, res) => {
      try {
        // const studentId = req.student.studentId;
        const courseId = req.params.courseId;
        const itemId = req.params.itemID;
        const query1 = `
        SELECT 
        Topic_Level_1.topic_level1_id,
        Topic_Level_1.topic_title AS topicTitle1,
        Topic_Level_n.topic_id,
        Topic_Level_n.topic_title AS topicTitlen,
        Items.item_id,
        Items.item_title,
        Items.item_no,
        Items_Types.type_name,
        CASE WHEN Completed_Items.item_id IS NOT NULL THEN TRUE ELSE FALSE END AS is_completed
    FROM course 
    JOIN items ON course.course_id = items.course_id
    JOIN Items_Types ON Items.item_type = Items_Types.type_id
    LEFT JOIN Completed_Items ON Items.item_id = Completed_Items.item_id
    JOIN Topic_Level_N ON items.topic_id = Topic_Level_N.topic_id
    JOIN Topic_Level_1 ON Topic_Level_N.topic_level1_id = Topic_Level_1.topic_level1_id
    WHERE course.course_id = $1`;
        const query2 = `
    SELECT 
    v.video_path
    FROM video v
    WHERE item_id=$1
    `;
        const values1 = [courseId];
        const values2 = [itemId];
        const result1 = await pool.query(query1, values1);
        const result2 = await pool.query(query2, values2);
        const videoPath = result2.rows[0].video_path;

        // Process the course content data
        const courseContent = [];

        // Set لتتبع العناصر التي تم استخدامها بالفعل بناءً على topic_id
        const usedTopicIds = new Set();

        result1.rows.forEach((row) => {
          const topicId = row.topic_level1_id;
          const subTopicId = row.topic_id;

          // التحقق مما إذا كان topic_id تم استخدامه بالفعل
          if (!usedTopicIds.has(topicId)) {
            courseContent.push({
              id: topicId,
              topicTitle: row.topictitle1,
              subTopics: [],
            });
            // إضافة topic_id إلى مجموعة العناصر المستخدمة بالفعل
            usedTopicIds.add(topicId);
          }

          // البحث عن الموضوع الحالي في courseContent
          const currentTopic = courseContent.find(
            (topic) => topic.id === topicId
          );

          // التحقق مما إذا كان subTopicId تم استخدامه بالفعل
          if (
            !currentTopic.subTopics.find(
              (subTopic) => subTopic.id === subTopicId
            )
          ) {
            currentTopic.subTopics.push({
              id: subTopicId,
              title: row.topictitlen,
              items: [],
            });
          }

          // البحث عن الموضوع الفرعي الحالي في subTopics
          const currentSubTopic = currentTopic.subTopics.find(
            (subTopic) => subTopic.id === subTopicId
          );

          currentSubTopic.items.push({
            id: row.item_id,
            title: row.item_title,
            order: row.item_no,
            type: row.type_name,
            is_completed: row.is_completed
          });
        });

        const response = {
          video: `http://localhost:5000/videos/${videoPath}`,
          courseContent: courseContent,
        };

        res.json(response);
      } catch (err) {
        console.error("Error retrieving course information:", err);
        res.status(500).json({ error: "Server Error" });
      }
    });

    // complete item
    router.post("/Completed", authorization, async (req, res) => {
      try {
        const{itemId,enrollmentId}=req.body;
        const query = `
        INSERT INTO Completed_Items(item_id,enrollment_id) VALUES($1,$2)
`;

        const values = [itemId,enrollmentId];

        const result = await pool.query(query, values);

        res.json("The item has been added");
      } catch (err) {
        console.error("Error insert item information", err);
        res.status(500).json({ error: "Server Error" });
      }
    });

    module.exports = router;
