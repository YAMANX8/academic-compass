const router = require("express").Router();
const pool = require("../../../Database/db");

// todo Here we used dynamic query
router.get("/course", async (req, res) => {
  try {
    const {
      Beginner,
      Intermediate,
      Expert,
      Rating,
      typeName1,
      typeName2,
      typeName3,
      courseTitle,
      courseRank,
    } = req.body;

    let condition1 = "";
    let condition2 = "";
    let condition3 = "";
    let condition4 = "";

    if (
      (Beginner !== "" || Intermediate !== "" || Expert !== "") &&
      (typeName1 !== "" || typeName2 !== "" || typeName3 !== "")
    ) {
      condition1 = `((l.level_name IS NOT NULL AND l.level_name IN ($1, $2, $3)) AND (ct.type_name IS NOT NULL AND ct.type_name IN ($4, $5, $6)))`;
    } else if (Beginner !== "" || Intermediate !== "" || Expert !== "") {
      condition2 = `((l.level_name IS NOT NULL AND l.level_name IN ($1, $2, $3)) OR (ct.type_name IS NOT NULL AND ct.type_name IN ($4, $5, $6)))`;
    } else if (typeName1 !== "" || typeName2 !== "" || typeName3 !== "") {
      condition3 = `((l.level_name IS NOT NULL AND l.level_name IN ($1, $2, $3)) OR (ct.type_name IS NOT NULL AND ct.type_name IN ($4, $5, $6)))`;
    } else if (
      Beginner == "" &&
      Intermediate == "" &&
      Expert == "" &&
      typeName1 == "" &&
      typeName2 == "" &&
      typeName3 == ""
    ) {
      condition4 = `((l.level_name IS NOT NULL AND l.level_name IN ($1, $2, $3)) OR (ct.type_name IS NOT NULL AND ct.type_name IN ($4, $5, $6)))`;
    }

    // بناء الشرط الثاني حسب الحالات الثلاث`**
    let condition5;
    let condition6;
    let values = [];
    if (Rating == "") {
      condition5 = `(c.course_title IS NOT NULL AND c.course_title ILIKE '%' || $7 || '%')`;
      condition6 = ` RC.course_rank > (($8 - 1) * 4) AND RC.course_rank <= ($8 * 4)`;
      values = [
        Beginner,
        Intermediate,
        Expert,
        typeName1,
        typeName2,
        typeName3,
        courseTitle,
        courseRank,
      ];
    } else {
      condition5 = `(rt.rating_stars IS NOT NULL AND rt.rating_stars >= $7) AND (c.course_title IS NOT NULL AND c.course_title ILIKE '%' || $8 || '%')`;
      condition6 = ` RC.course_rank > (($9 - 1) * 4) AND RC.course_rank <= ($9 * 4)`;
      values = [
        Beginner,
        Intermediate,
        Expert,
        typeName1,
        typeName2,
        typeName3,
        Rating,
        courseTitle,
        courseRank,
      ];
    }

    // دمج الشروط الثلاث حسب الحالة
    let finalCondition = "";
    if (
      condition1 !== "" &&
      condition2 == "" &&
      condition3 == "" &&
      condition4 == ""
    ) {
      finalCondition = `(${condition1}) AND (${condition5})`;
    } else if (
      condition1 == "" &&
      condition2 !== "" &&
      condition3 == "" &&
      condition4 == ""
    ) {
      finalCondition = `(${condition2}) AND (${condition5})`;
    } else if (
      condition1 == "" &&
      condition2 == "" &&
      condition3 !== "" &&
      condition4 == ""
    ) {
      finalCondition = `(${condition3}) AND (${condition5})`;
    } else if (
      condition1 == "" &&
      condition2 == "" &&
      condition3 == "" &&
      condition4 !== ""
    ) {
      finalCondition = `(${condition4}) OR (${condition5})`;
    }

    // بناء الاستعلام النهائي باستخدام الشرط النهائي
    const query = `
WITH RankedCourses AS (
  SELECT
    r.roadmap_id,
    c.course_id,
    ROW_NUMBER() OVER (PARTITION BY r.roadmap_id ORDER BY c.course_id) AS course_rank
  FROM
    Course c
  JOIN
    Levels l ON c.course_level = l.level_id
  JOIN
    Courses_Type ct ON c.course_type = ct.type_id
  JOIN
    Users u ON c.instructor_id = u.user_id
  LEFT JOIN (
    SELECT
      e.course_id,
      AVG(r.stars_number) AS rating_stars
    FROM
      Enrollment e
    JOIN
      Rating r ON e.enrollment_id = r.enrollment_id
    GROUP BY
      e.course_id
  ) rt ON c.course_id = rt.course_id
  JOIN
    items i ON c.course_id = i.course_id
  JOIN
    Topic_level_N TLN ON i.topic_id = TLN.topic_id
  JOIN
    Topic_level_1 TL1 ON TLN.topic_level1_id = TL1.topic_level1_id
  JOIN
    roadmap r ON TL1.roadmap_id = r.roadmap_id
  WHERE
    ${finalCondition}
    )
  , TotalCourseCount AS (
    SELECT COUNT(*) AS total_courses 
    FROM RankedCourses
)
SELECT
    RC.roadmap_id,
    r.roadmap_title,
    RC.course_id,
    c.course_title,
    c.subtitle,
    c.course_duration,
    l.level_name,
    u.first_name,
    u.last_name,
    rt.rating_stars,
    i.item_no,
    TLN.topic_title,
    (SELECT total_courses FROM TotalCourseCount) AS total_courses
FROM
    RankedCourses RC
JOIN
    Course c ON RC.course_id = c.course_id
JOIN
    roadmap r ON RC.roadmap_id = r.roadmap_id
JOIN
    Levels l ON c.course_level = l.level_id
JOIN
    Courses_Type ct ON c.course_type = ct.type_id
JOIN
    Users u ON c.instructor_id = u.user_id
LEFT JOIN (
    SELECT
        e.course_id,
        AVG(r.stars_number) AS rating_stars
    FROM
        Enrollment e
    JOIN
        Rating r ON e.enrollment_id = r.enrollment_id
    GROUP BY
        e.course_id
) rt ON c.course_id = rt.course_id
JOIN
    items i ON c.course_id = i.course_id
JOIN
    Topic_level_N TLN ON i.topic_id = TLN.topic_id
WHERE
   ${condition6}
ORDER BY
    RC.roadmap_id,
    RC.course_rank;
`;
    console.log(query);

    const result = await pool.query(query, values);

    const courses = [];
    let total_courses = 0;
    // تحويل البيانات من قاعدة البيانات إلى التنسيق المطلوب
    result.rows.forEach((row) => {
      const roadmapId = row.roadmap_id;
      const roadmapTitle = row.roadmap_title;
      const courseId = row.course_id;
      const courseTitle = row.course_title;
      const subtitle = row.subtitle;
      const courseDuration = row.course_duration;
      const courseThumnail = row.course_thumnail;
      const levelName = row.level_name;
      const instructorName = `${row.first_name} ${row.last_name}`;
      const ratingStars = parseFloat(row.rating_stars);
      const itemNo = row.item_no;
      const topicTitle = row.topic_title;
      total_courses = row.total_courses;
      // تحقق مما إذا كانت هناك مسارات مكررة في القائمة أو لا
      let existingRoadmap = courses.find((course) => course.id === roadmapId);

      if (!existingRoadmap) {
        // إذا لم يكن هناك مسار بنفس الهوية، قم بإنشاء واحد جديد
        existingRoadmap = {
          id: roadmapId,
          roadmap: roadmapTitle,
          courseescount: 0,
          courses: [],
        };
        courses.push(existingRoadmap);
      }

      // إنشاء معلومات الكورس
      const courseInfo = {
        id: courseId,
        title: courseTitle,
        subtitle: subtitle,
        ratings: ratingStars,
        duration: courseDuration,
        itemsCount: itemNo,
        level: levelName,
        instructor: instructorName,
        topics: [topicTitle],
        thumnail: courseThumnail,
      };

      // إضافة معلومات الكورس إلى المسار المناسب
      existingRoadmap.courses.push(courseInfo);
      existingRoadmap.courseescount++;
    });
    // إرسال البيانات بالشكل المطلوب
    res.status(200).json({
      status: "success",
      total_courses: total_courses,
      data: courses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//* serch by topc_id
router.get("/topic", async (req, res) => {
  try {
    const {
      Beginner,
      Intermediate,
      Expert,
      Rating,
      typeName1,
      typeName2,
      typeName3,
      topiclevel_N,
      topiclevel_1,
      courseRank,
    } = req.body;

    let condition1 = "";
    let condition2 = "";
    let condition3 = "";
    let condition4 = "";

    if (
      (Beginner !== "" || Intermediate !== "" || Expert !== "") &&
      (typeName1 !== "" || typeName2 !== "" || typeName3 !== "")
    ) {
      condition1 = `((l.level_name IS NOT NULL AND l.level_name IN ($1, $2, $3)) AND (ct.type_name IS NOT NULL AND ct.type_name IN ($4, $5, $6)))`;
    } else if (Beginner !== "" || Intermediate !== "" || Expert !== "") {
      condition2 = `((l.level_name IS NOT NULL AND l.level_name IN ($1, $2, $3)) OR (ct.type_name IS NOT NULL AND ct.type_name IN ($4, $5, $6)))`;
    } else if (typeName1 !== "" || typeName2 !== "" || typeName3 !== "") {
      condition3 = `((l.level_name IS NOT NULL AND l.level_name IN ($1, $2, $3)) OR (ct.type_name IS NOT NULL AND ct.type_name IN ($4, $5, $6)))`;
    } else if (
      Beginner == "" &&
      Intermediate == "" &&
      Expert == "" &&
      typeName1 == "" &&
      typeName2 == "" &&
      typeName3 == ""
    ) {
      condition4 = `((l.level_name IS NOT NULL AND l.level_name IN ($1, $2, $3)) OR (ct.type_name IS NOT NULL AND ct.type_name IN ($4, $5, $6)))`;
    }

    // بناء الشرط الثاني حسب الحالات الثلاث`
    let condition5 = "";
    let topicId = 0;
    if (topiclevel_N !== "") {
      topicId = topiclevel_N;
      condition5 = `(rt.rating_stars IS NOT NULL AND rt.rating_stars >= $7) AND (TLN.topic_id IS NOT NULL AND TLN.topic_id = $8)`;
    } else if (topiclevel_1 !== "") {
      topicId = topiclevel_1;
      condition5 = `(rt.rating_stars IS NOT NULL AND rt.rating_stars >= $7) AND (TL1.topic_level1_id IS NOT NULL AND TL1.topic_level1_id = $8)`;
    }

    // دمج الشروط الثلاث حسب الحالة
    let finalCondition = "";
    if (
      condition1 !== "" &&
      condition2 == "" &&
      condition3 == "" &&
      condition4 == ""
    ) {
      finalCondition = `(${condition1}) AND (${condition5})`;
    } else if (
      condition1 == "" &&
      condition2 !== "" &&
      condition3 == "" &&
      condition4 == ""
    ) {
      finalCondition = `(${condition2}) AND (${condition5})`;
    } else if (
      condition1 == "" &&
      condition2 == "" &&
      condition3 !== "" &&
      condition4 == ""
    ) {
      finalCondition = `(${condition3}) AND (${condition5})`;
    } else if (
      condition1 == "" &&
      condition2 == "" &&
      condition3 == "" &&
      condition4 !== ""
    ) {
      finalCondition = `(${condition4}) OR (${condition5})`;
    }

    // بناء الاستعلام النهائي باستخدام الشرط النهائي
    const query = `
WITH RankedCourses AS (
    SELECT
        r.roadmap_id,
        c.course_id,
        ROW_NUMBER() OVER (PARTITION BY r.roadmap_id ORDER BY c.course_id) AS course_rank
    FROM
        Course c
    JOIN
        Levels l ON c.course_level = l.level_id
    JOIN
        Courses_Type ct ON c.course_type = ct.type_id
    JOIN
        Users u ON c.instructor_id = u.user_id
    LEFT JOIN (
        SELECT
            e.course_id,
            AVG(r.stars_number) AS rating_stars
        FROM
            Enrollment e
        JOIN
            Rating r ON e.enrollment_id = r.enrollment_id
        GROUP BY
            e.course_id
    ) rt ON c.course_id = rt.course_id
    JOIN
        items i ON c.course_id = i.course_id
    JOIN
        Topic_level_N TLN ON i.topic_id = TLN.topic_id
    JOIN
        Topic_level_1 TL1 ON TLN.topic_level1_id = TL1.topic_level1_id
    JOIN
        roadmap r ON TL1.roadmap_id = r.roadmap_id
  WHERE
    ${finalCondition}
    )
  , TotalCourseCount AS (
    SELECT COUNT(*) AS total_courses 
    FROM RankedCourses
)
SELECT
    RC.roadmap_id,
    r.roadmap_title,
    RC.course_id,
    c.course_title,
    c.course_description,
    c.course_duration,
    l.level_name,
    u.first_name,
    u.last_name,
    rt.rating_stars,
    ct.type_name,
    i.item_no,
    TLN.topic_title AS topic_level_N_title, 
    TL1.topic_title AS topic_level_1_title,
    (SELECT total_courses FROM TotalCourseCount) AS total_courses
FROM
    RankedCourses RC
JOIN
    Course c ON RC.course_id = c.course_id
JOIN
    roadmap r ON RC.roadmap_id = r.roadmap_id
JOIN
    Levels l ON c.course_level = l.level_id
JOIN
    Courses_Type ct ON c.course_type = ct.type_id
JOIN
    Users u ON c.instructor_id = u.user_id
LEFT JOIN (
    SELECT
        e.course_id,
        AVG(r.stars_number) AS rating_stars
    FROM
        Enrollment e
    JOIN
        Rating r ON e.enrollment_id = r.enrollment_id
    GROUP BY
        e.course_id
) rt ON c.course_id = rt.course_id
JOIN
    items i ON c.course_id = i.course_id
JOIN
    Topic_level_N TLN ON i.topic_id = TLN.topic_id
JOIN
    Topic_level_1 TL1 ON TLN.topic_level1_id = TL1.topic_level1_id
WHERE
    RC.course_rank > (($9 - 1) * 4)
    AND RC.course_rank <= ($9 * 4)
ORDER BY
    RC.roadmap_id,
    RC.course_rank;
`;
    console.log(query);
    const values = [
      Beginner,
      Intermediate,
      Expert,
      typeName1,
      typeName2,
      typeName3,
      Rating,
      topicId,
      courseRank,
    ];
    const result = await pool.query(query, values);

    const courses = [];
    let total_courses = 0;
    // تحويل البيانات من قاعدة البيانات إلى التنسيق المطلوب
    result.rows.forEach((row) => {
      const roadmapId = row.roadmap_id;
      const roadmapTitle = row.roadmap_title;
      const courseId = row.course_id;
      const courseTitle = row.course_title;
      const subtitle = row.subtitle;
      const courseDuration = row.course_duration;
      const courseThumnail = row.course_thumnail;
      const levelName = row.level_name;
      const instructorName = `${row.first_name} ${row.last_name}`;
      const ratingStars = parseFloat(row.rating_stars);
      const itemNo = row.item_no;
      const topicTitleN = row.topic_level_N_title;
      const topicTitle1 = row.topic_level_1_title;
      total_courses = row.total_courses;
      // تحقق مما إذا كانت هناك مسارات مكررة في القائمة أو لا
      let existingRoadmap = courses.find((course) => course.id === roadmapId);

      if (!existingRoadmap) {
        // إذا لم يكن هناك مسار بنفس الهوية، قم بإنشاء واحد جديد
        existingRoadmap = {
          id: roadmapId,
          roadmap: roadmapTitle,
          courseescount: 0,
          courses: [],
        };
        courses.push(existingRoadmap);
      }

      // إنشاء معلومات الكورس
      const courseInfo = {
        id: courseId,
        title: courseTitle,
        subtitle: subtitle,
        ratings: ratingStars,
        duration: courseDuration,
        itemsCount: itemNo,
        level: levelName,
        instructor: instructorName,
        topicsN: [topicTitleN],
        topics1: [topicTitle1],
        thumnail: courseThumnail,
      };

      // إضافة معلومات الكورس إلى المسار المناسب
      existingRoadmap.courses.push(courseInfo);
      existingRoadmap.courseescount++;
    });
    // إرسال البيانات بالشكل المطلوب
    res.status(200).json({
      status: "success",
      total_courses: total_courses,
      data: courses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

`
{
 total_courses:24 
,[
  {
    id:1,
    roadmap:'frontend',
    courseescount:12,
    courses:[
      {
        id:1,
        title:"blablabla",
        ratings:4.5,
        duration:60,
        itemsCount:75,
        level:'beginers',
        instructor:'Ammar',
        topics:['Html','CSS','JavaScript'],
        thumnail:"Imagepath"
      },
      {
        id:2,
        title:"blablabla",
        ratings:5,
        duration:60,
        itemsCount:50,
        level:'beginers',
        instructor:'Ammar',
        topics:['Html','CSS','JavaScript'],
        thumnail:"Imagepath"
      },
    ]
  },
  {
    id:1,
    roadmap:'backend',
    courseescount:12,
    courses:[
      {
        id:1,
        title:"blablabla",
        ratings:4.5,
        duration:60,
        itemsCount:75,
        level:'beginers',
        instructor:'Ammar',
        topics:['Html','CSS','JavaScript'],
        thumnail:"Imagepath"
      },
      {
        id:2,
        title:"blablabla",
        ratings:5,
        duration:60,
        itemsCount:50,
        level:'beginers',
        instructor:'Ammar',
        topics:['Html','CSS','JavaScript'],
        thumnail:"Imagepath"
      },
    ]

  }
]
}
`;
