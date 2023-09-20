const router = require("express").Router();
const db = require("../../../Database/db");

router.get("/:studentId/:courseId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;

    const Get_Course_info =
      "SELECT course.course_thumnail, course.course_title, course.subtitle, ROUND(COALESCE(AVG(Rating.stars_number), 0), 0) AS average_rating, COUNT(DISTINCT Rating.enrollment_id) AS rating_count, course.course_duration, course.items_count, Levels.level_name, Users.first_name, Users.last_name, COUNT(CASE WHEN items.item_type = 1 THEN 1 END) AS article_count, COUNT(CASE WHEN items.item_type = 2 THEN 1 END) AS video_count, COUNT(CASE WHEN items.item_type = 3 THEN 1 END) AS quiz_count, course.course_description, COALESCE(IS_ENROLLED.is_enrolled, 0) AS is_enrolled FROM course JOIN Levels ON course.course_level = Levels.level_id JOIN Users ON course.instructor_id = Users.user_id JOIN items ON course.course_id = items.course_id LEFT JOIN Enrollment ON course.course_id = Enrollment.course_id LEFT JOIN Rating ON Enrollment.enrollment_id = Rating.enrollment_id LEFT JOIN (SELECT course_id, MAX(CASE WHEN student_id = $1 THEN 1 ELSE 0 END) AS is_enrolled FROM Enrollment GROUP BY course_id) AS IS_ENROLLED ON course.course_id = IS_ENROLLED.course_id WHERE course.course_id = $2 GROUP BY course.course_thumnail, course.course_title, course.subtitle, course.course_duration, course.items_count, Users.first_name, Users.last_name, Levels.level_name, course.course_description, IS_ENROLLED.is_enrolled";
    const Get_Topic_content =
      "SELECT Topic_Level_1.topic_level1_id, Topic_Level_1.topic_title AS tl1, Topic_Level_n.topic_id, Topic_Level_n.topic_title AS tln, Items.item_id, Items.item_title, Items.item_no, Items_Types.type_name FROM course JOIN items ON course.course_id= items.course_id JOIN Items_Types ON Items.item_type= Items_Types.type_id join Topic_Level_N ON items.topic_id= Topic_Level_N.topic_id join Topic_Level_1 ON Topic_Level_N.topic_level1_id= Topic_Level_1.topic_level1_id WHERE course.course_id = $1";
    const Part_2From_Course_info =
      "SELECT List_Type.type_name, Course_Lists.item_body, Course_Lists.item_order FROM course JOIN Course_Lists ON Course.course_id = Course_Lists.course_id JOIN List_Type ON Course_Lists.list_type= List_Type.type_id WHERE course.course_id = $1";
    const Get_Review =
      "SELECT Rating.rating_id, Student.first_name, Student.last_name, Student.picture, Rating.stars_number, Rating.review FROM course LEFT JOIN Enrollment ON Course.course_id = Enrollment.course_id JOIN Student ON Enrollment.student_id = Student.student_id JOIN Rating ON Enrollment.enrollment_id = Rating.enrollment_id WHERE course.course_id = $1";
    // const values = [studentId, courseId];

    const Get_Course_info_result = await db.query(Get_Course_info, [
      studentId,
      courseId,
    ]);
    const Get_Topic_content_result = await db.query(Get_Topic_content, [
      courseId,
    ]);
    const Part_2From_Course_info_result = await db.query(
      Part_2From_Course_info,
      [courseId]
    );
    const Get_Review_result = await db.query(Get_Review, [courseId]);

    // const data4 = Part_2From_Course_info_result.rows.map((item) => ({
    //   [item.type_name]: {
    //     item_body: item.item_body,
    //     item_order: item.item_order,
    //   },
    // }));

    //for learn..
    const learnItems = [];
    const forWhoItems = [];
    const requirementsItems = [];
    Part_2From_Course_info_result.rows.forEach((row) => {
      if (row.type_name === "In this course you will learn the following") {
        learnItems.push(row.item_body);
      } else if (row.type_name === "Who this course is for:") {
        forWhoItems.push(row.item_body);
      } else if (row.type_name === "Requirements") {
        requirementsItems.push(row.item_body);
      }
    });

    // Process the course content data
const courseContent = [];

// Set لتتبع العناصر التي تم استخدامها بالفعل بناءً على topic_id
const usedTopicIds = new Set();

Get_Topic_content_result.rows.forEach((row) => {
  const topicId = row.topic_level1_id;
  const subTopicId = row.topic_id;

  // التحقق مما إذا كان topic_id تم استخدامه بالفعل
  if (!usedTopicIds.has(topicId)) {
    courseContent.push({
      id: topicId,
      topicTitle: row.tl1,
      subTopics: [],
    });
    // إضافة topic_id إلى مجموعة العناصر المستخدمة بالفعل
    usedTopicIds.add(topicId);
  }

  // البحث عن الموضوع الحالي في courseContent
  const currentTopic = courseContent.find((topic) => topic.id === topicId);

  // التحقق مما إذا كان subTopicId تم استخدامه بالفعل
  if (!currentTopic.subTopics.find((subTopic) => subTopic.id === subTopicId)) {
    currentTopic.subTopics.push({
      id: subTopicId,
      title: row.tln,
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
  });
});


    // Process the reviews data
    const reviews = Get_Review_result.rows.map((row) => ({
      id: row.rating_id,
      fname: row.first_name,
      lname: row.last_name,
      images: row.picture,
      stars: row.stars_number,
      comment: row.review,
    }));
    const frontEndJson = {
      course_thumnail: Get_Course_info_result.rows[0].course_thumnail,
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
      courseContent: courseContent, // Add the course content data
      reviews: reviews, // Add the reviews data
    };

    res.json(frontEndJson);
  } catch (err) {
    console.error("Error retrieving course information:", err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;

`{
    image: Card,

    title: "Learn Api basics, and learn how to integrate with the backend",

    subtitle: "Fetch api: Explore how to connect to various web APIs using JavaScript fetch. Use the returned data JSON data within you Code.",

    stars: 4.5,

    ratings: 1000,

    duration: 10,

    itemsCount: 75,

    level: "beginres",

    instructor: "Jone Doe",

    videoCount: 25,

    quizCount: 25,

    articleCount: 25,

    descripation: lorem ipsom,

    learn: [
      "Work with one of the most in-demand web development programming languages",
      "Build modern, fast and scalable server-side web applications with NodeJS, databases like SQL or MongoDB and more",
      "Get a thorough introduction to DenoJS",
      "Learn the basics as well as advanced concepts of NodeJS in great detail",
      "Understand the NodeJS ecosystem and build server-side rendered apps, REST APIs and GraphQL APIs",
    ],

    forWho: [
      "Beginner or advanced web developers who want to dive into backend (server-side) development with NodeJS",
      "Everyone who's interested in building modern, scalable and high-performing web applications",
      "Experienced NodeJS developers who want to dive into specific features like using GraphQL with NodeJS",
      "Anyone interested in learning how to program that is already struggling or intimidated by the process",
    ],

    requirements: [
      "General knowledge of how the web works is recommended but not a must-have",
      "Basic JavaScript knowledge is strongly recommended but could be picked up whilst going through the course",
      "NO NodeJS knowledge is required!",
      "Access to the internet",
    ],

    courseContent: [
      {
        id: 1,
        topicTitle: "Topic level 1",
        subTopics: [
          {
            id: 1,
            title: "webpack",
            items: [
              {
                id: 1,
                title: "video intro",
                order: 1,
                type: "video",
              },
              {
                id: 2,
                title: "An Article",
                order: 2,
                type: "article",
              },
              {
                id: 3,
                title: "An Quiz",
                order: 3,
                type: "quiz",
              },
            ],
          },
          {
            id: 2,
            title: "Topic level N",
            items: [
              {
                id: 1,
                title: "A Lecture",
                order: 1,
                type: "video",
              },
              {
                id: 2,
                title: "An Article",
                order: 2,
                type: "article",
              },
              {
                id: 3,
                title: "A Quiz",
                order: 3,
                type: "quiz",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        topicTitle: "Topic level 1",
        subTopics: [
          {
            id: 1,
            title: "Topic level N",
            items: [
              {
                id: 4,
                title: "A Lecture",
                order: 4,
                type: "video",
              },
              {
                id: 5,
                title: "An Article",
                order: 5,
                type: "article",
              },
              {
                id: 6,
                title: "A Quiz",
                order: 6,
                type: "quiz",
              },
            ],
          },
        ],
      },
    ],
    
    reviews: [
      {
        id: 1,
        fname: "Ahmed",
        lname: "Omer",
        images: Profile,
        stars: 4.5,
        comment: "The course contains a lot of useful information, and if you are
      just starting out in the world of programming, I would
       recommend this course. The only criticism is that it has
        become quite outdated, and many things have changed, so"}
      recommend this course. The only criticism is that it has
        recommend this course. The only criticism is that it has,
        img: Profile,
      },
      {
        id: 2,
        fname: "Yaman",
        lname: "Al-Jazzar",
        image: Card,
        stars: 4.5,
        comment: "The course contains a lot of useful information, and if you are
      just starting out in the world of programming, I would
      soso soso soso soso sosososo soso soso soso sosososo soso
       soso soso sosososo soso soso soso sosososo soso soso soso soso
       soso soso sosososo soso soso soso sosososo soso soso soso soso
       soso soso sosososo soso soso soso sosososo soso soso soso soso",
        
        img: Profile,
      },
      {
        id: 3,
        fname: "Ahmed",
        lname: "Sadek",
        image: Card,
        stars: 4.5,
        comment: "The course contains a lot of useful information, and if you are
      just starting out in the world of programming, I would
       recommend this course. The only criticism is that it has
       momo momo momo momo momomomo momo momo momo momomomo momo
       momo momo momomomo momo momo momo momomomo momo momo momo momo",
        
        img: Profile,
      },
      {
        id: 4,
        fname: "Ammar",
        lname: "Al-Essrawi",
        image: Card,
        stars: 4.5,
        comment: "The course contains a lot of useful information, and if you are
        just starting out in the world of programming, I would
       recommend this course. The only criticism is that it has
        become quite outdated, and many things have changed, so 
        ",
        
        img: Profile,
      },
    ],
  }
        `