const router = require('express').Router();
const pool = require('../../database/db');
const jwt = require('jsonwebtoken');
const checkPermission = require('../../middleware/check-permissions');
const authorization = require('../../middleware/authorization');

router.get('/:courseId', async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const authHeader = req.header('Authorization');
    let jwtToken = null;
    let Course_info;
    let values = [];

    if (authHeader) {
      jwtToken = authHeader.split(' ')[1];
    }

    if (!jwtToken) {
      Course_info = `
        SELECT
          course.course_thumnail,
          course.course_title,
          course.subtitle,
          ROUND(COALESCE(AVG(Rating.stars_number), 0), 0) AS average_rating,
          COUNT(DISTINCT Rating.enrollment_id) AS rating_count,
          course.course_duration,
          course.items_count,
          Levels.level_name,
          Users.first_name,
          Users.last_name,
          item_counts.article_count,
          item_counts.video_count,
          item_counts.quiz_count,
          course.course_description
        FROM
          course
          JOIN Levels ON course.course_level = Levels.level_id
          JOIN Users ON course.instructor_id = Users.user_id
          LEFT JOIN Enrollment ON course.course_id = Enrollment.course_id
          LEFT JOIN Rating ON Enrollment.enrollment_id = Rating.enrollment_id
          LEFT JOIN (
            SELECT
              course_id,
              COUNT(CASE WHEN item_type = 1 THEN 1 END) AS article_count,
              COUNT(CASE WHEN item_type = 2 THEN 1 END) AS video_count,
              COUNT(CASE WHEN item_type = 3 THEN 1 END) AS quiz_count
            FROM
              items
            GROUP BY
              course_id
          ) AS item_counts ON course.course_id = item_counts.course_id
        WHERE
          course.course_id = $1
        GROUP BY
          course.course_thumnail,
          course.course_title,
          course.subtitle,
          course.course_duration,
          course.items_count,
          Users.first_name,
          Users.last_name,
          Levels.level_name,
          course.course_description,
          item_counts.article_count,
          item_counts.video_count,
          item_counts.quiz_count;
      `;
      values = [courseId];
    } else {
      const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
      const studentId = payload.userId;
      const roleId = payload.roleId;
      try {
        const hasAccess = await checkPermission(
          studentId,
          'show_course',
          roleId,
        );
        if (!hasAccess) {
          return res.status(403).json('Access denied');
        }
      } catch (error) {
        console.log(error);
      }
      Course_info = `
        SELECT
          course.course_thumnail,
          course.course_title,
          course.subtitle,
          ROUND(COALESCE(AVG(Rating.stars_number), 0), 0) AS average_rating,
          COUNT(DISTINCT Rating.enrollment_id) AS rating_count,
          course.course_duration,
          course.items_count,
          Levels.level_name,
          Users.first_name,
          Users.last_name,
          item_counts.article_count,
          item_counts.video_count,
          item_counts.quiz_count,
          course.course_description,
          COALESCE(IS_ENROLLED.is_enrolled, 0) AS is_enrolled
        FROM
          course
          JOIN Levels ON course.course_level = Levels.level_id
          JOIN Users ON course.instructor_id = Users.user_id
          LEFT JOIN Enrollment ON course.course_id = Enrollment.course_id
          LEFT JOIN Rating ON Enrollment.enrollment_id = Rating.enrollment_id
          LEFT JOIN (
            SELECT
              course_id,
              COUNT(CASE WHEN item_type = 1 THEN 1 END) AS article_count,
              COUNT(CASE WHEN item_type = 2 THEN 1 END) AS video_count,
              COUNT(CASE WHEN item_type = 3 THEN 1 END) AS quiz_count
            FROM
              items
            GROUP BY
              course_id
          ) AS item_counts ON course.course_id = item_counts.course_id
          LEFT JOIN (
            SELECT
              course_id,
              MAX(CASE WHEN student_id = $1 THEN 1 ELSE 0 END) AS is_enrolled
            FROM
              Enrollment
            GROUP BY
              course_id
          ) AS IS_ENROLLED ON course.course_id = IS_ENROLLED.course_id
        WHERE
          course.course_id = $2
        GROUP BY
          course.course_thumnail,
          course.course_title,
          course.subtitle,
          course.course_duration,
          course.items_count,
          Users.first_name,
          Users.last_name,
          Levels.level_name,
          course.course_description,
          IS_ENROLLED.is_enrolled,
          item_counts.article_count,
          item_counts.video_count,
          item_counts.quiz_count;
      `;
      values = [studentId, courseId];
    }

    const Get_Course_info = `${Course_info}`;
    const Get_Topic_content = `
      SELECT
        Items.item_id,
        Items.item_title,
        Items.item_no,
        Items_Types.type_name,
        Topic_Level_n.topic_title,
        Items.topic_id AS topic_level1_id,
        Topic_Level_n.topic_title AS tl1
      FROM
        items
        JOIN Items_Types ON Items.item_type = Items_Types.type_id
        JOIN Topic_Level_n ON Items.topic_id = Topic_Level_n.topic_id
      WHERE
        items.course_id = $1
      ORDER BY
        Items.topic_id, Items.item_no
    `;
    const Part_2From_Course_info = `
      SELECT
        List_Type.type_name,
        Course_Lists.item_body,
        Course_Lists.item_order
      FROM
        course
        JOIN Course_Lists ON Course.course_id = Course_Lists.course_id
        JOIN List_Type ON Course_Lists.list_type = List_Type.type_id
      WHERE
        course.course_id = $1
    `;
    const Get_Review = `
      SELECT
        Rating.rating_id,
        Student.first_name,
        Student.last_name,
        Student.picture,
        Rating.stars_number,
        Rating.review
      FROM
        course
        LEFT JOIN Enrollment ON Course.course_id = Enrollment.course_id
        JOIN Student ON Enrollment.student_id = Student.student_id
        JOIN Rating ON Enrollment.enrollment_id = Rating.enrollment_id
      WHERE
        course.course_id = $1
    `;

    const Get_Course_info_result = await pool.query(Get_Course_info, values);
    const Get_Topic_content_result = await pool.query(Get_Topic_content, [
      courseId,
    ]);
    const Part_2From_Course_info_result = await pool.query(
      Part_2From_Course_info,
      [courseId],
    );
    const Get_Review_result = await pool.query(Get_Review, [courseId]);

    const learnItems = [];
    const forWhoItems = [];
    const requirementsItems = [];
    Part_2From_Course_info_result.rows.forEach((row) => {
      if (row.type_name === 'In this course you will learn the following') {
        learnItems.push(row.item_body);
      } else if (row.type_name === 'Who this course is for:') {
        forWhoItems.push(row.item_body);
      } else if (row.type_name === 'Requirements') {
        requirementsItems.push(row.item_body);
      }
    });

    const courseContent = [];
    const usedTopicIds = new Set();
    Get_Topic_content_result.rows.forEach((row) => {
      const topicId = row.topic_level1_id;

      if (!usedTopicIds.has(topicId)) {
        courseContent.push({
          id: topicId,
          topicTitle: row.tl1,
          items: [],
        });
        usedTopicIds.add(topicId);
      }

      const currentTopic = courseContent.find((topic) => topic.id === topicId);
      currentTopic.items.push({
        id: row.item_id,
        title: row.item_title,
        order: row.item_no,
        type: row.type_name,
      });
    });

    const reviews = Get_Review_result.rows.map((row) => ({
      id: row.rating_id,
      fname: row.first_name,
      lname: row.last_name,
      images: row.picture,
      stars: row.stars_number,
      comment: row.review,
    }));

    const frontEndJson = {
      course_thumnail: `http://localhost:5000/image/${Get_Course_info_result.rows[0].course_thumnail}`,
      course_title: Get_Course_info_result.rows[0].course_title,
      subtitle: Get_Course_info_result.rows[0].subtitle,
      stars: Get_Course_info_result.rows[0].average_rating,
      ratingCount: Get_Course_info_result.rows[0].rating_count,
      courseDuration: Get_Course_info_result.rows[0].course_duration,
      itemsCount: Get_Course_info_result.rows[0].items_count,
      levelName: Get_Course_info_result.rows[0].level_name,
      instructor: `${Get_Course_info_result.rows[0].first_name} ${Get_Course_info_result.rows[0].last_name}`,
      video_count: Get_Course_info_result.rows[0].video_count,
      article_count: Get_Course_info_result.rows[0].article_count,
      quiz_count: Get_Course_info_result.rows[0].quiz_count,
      course_description: Get_Course_info_result.rows[0].course_description,
      is_enrolled: Get_Course_info_result.rows[0].is_enrolled,
      learn: learnItems,
      forWho: forWhoItems,
      requirements: requirementsItems,
      courseContent: courseContent,
      reviews: reviews,
    };

    res.json(frontEndJson);
  } catch (err) {
    console.error('Error retrieving course information:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});


router.post('/enroll', authorization, async (req, res) => {
  try {
    const studentId = req.user.userId;
    const roleId = req.user.roleId;
    //permission
    const hasAccess = await checkPermission(
      studentId,
      'enrollToCourse',
      roleId,
    );
    if (!hasAccess) {
      return res.status(403).json('Access denied');
    }
    const { courseId } = req.body;
    const progress = 0;
    const startDate = new Date(); //

    //تجهيز استعلام للتحقق من أن الطالب قد قام مسبقاً بالاشتراك بالدورة
    const checkEnrollmentQuery = `
      SELECT
        student_id,
        course_id
      FROM
        enrollment
      WHERE
        student_id = '${studentId}'
        AND course_id = '${courseId}';
    `;
    const { rows } = await pool.query(checkEnrollmentQuery);
    if (rows.length === 0) {
      const insertEnrollmentQuery = `
        INSERT INTO
          enrollment (
            student_id,
            progress_state,
            strting_date,
            course_id
          )
        VALUES
          ($1, $2, $3, $4)
        RETURNING
          enrollment_id;
      `;

      const values = [studentId, progress, startDate, courseId];
      const result = await pool.query(insertEnrollmentQuery, values);

      res.json({ enrollmentId: result.rows[0].enrollment_id });
    } else {
      return res
        .status(401)
        .json({ message: 'You are already enrolled to this course!' });
    }
  } catch (err) {
    console.error('Error inserting enrollment:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
