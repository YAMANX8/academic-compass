-- All instructions executed on the database are written here
-- UTF8
SELECT datname, pg_encoding_to_char(encoding) FROM pg_database WHERE datname = 'maptow';
-- change COLUMN password character in student from 50 to 100 
ALTER TABLE student
ALTER COLUMN image_path TYPE character varying(150);
-- add new column to table
ALTER TABLE table_name
ADD COLUMN new_column_name data_type;

ALTER TABLE topic_level_1
ADD COLUMN topic_order character varying(50);


-- example
ALTER TABLE roadmap
ADD COLUMN image_path VARCHAR(50);

-- change COLUMN password character in register_request from 50 to 100 
ALTER TABLE register_request
ALTER COLUMN password TYPE character varying(100);

-- Add Add values to a table (Note These values are constant)
INSERT INTO Role (role_name)
VALUES
  ('platform manager'),
  ('Academic manager'),
  ('Academic supervisor'),
  ('lecturer');

-- SELECT to get course_title,progress_state,course_score,total_points
SELECT
    c.course_title,
    e.progress_state,
    e.course_score,
    COALESCE(SUM(qs.question_points), 0) AS total_points
FROM
    "course" c
JOIN
    "enrollment" e ON c.course_id = e.course_id
LEFT JOIN
    "items" i ON c.course_id = i.course_id
LEFT JOIN
    "quiz" q ON q.item_id = i.item_id
LEFT JOIN
    "quistion" qs ON q.quiz_id = qs.quiz_id
LEFT JOIN
    "option" o ON qs.quistion_id = o.quistion_id
WHERE
    e.student_id = 2
GROUP BY
    c.course_title, e.progress_state, e.course_score
ORDER BY
    c.course_title;

-- SELECT to get course_title,progress_state,course_score,total_points with count
SELECT
    c.course_title,
    e.progress_state,
    e.course_score,
    COALESCE(SUM(qs.question_points), 0) AS total_points,
    COUNT(CASE WHEN e.progress_state = 'In Progress' THEN 1 END) AS courses_in_progress,
    COUNT(CASE WHEN e.progress_state = 'Completed' THEN 1 END) AS courses_completed
FROM
    "course" c
JOIN
    "enrollment" e ON c.course_id = e.course_id
LEFT JOIN
    "items" i ON c.course_id = i.course_id
LEFT JOIN
    "quiz" q ON q.item_id = i.item_id
LEFT JOIN
    "quistion" qs ON q.quiz_id = qs.quiz_id
LEFT JOIN
    "option" o ON qs.quistion_id = o.quistion_id
WHERE
    e.student_id = 1
GROUP BY
    c.course_title, e.progress_state, e.course_score
ORDER BY
    c.course_title;

--دورات قيد التقدم 
SELECT c.*
FROM "course" c
JOIN (
    SELECT
        c.course_title,
        e.progress_state
    FROM
        "course" c
    JOIN
        "enrollment" e ON c.course_id = e.course_id
    LEFT JOIN
        "items" i ON c.course_id = i.course_id
    LEFT JOIN
        "quiz" q ON q.item_id = i.item_id
    LEFT JOIN
        "quistion" qs ON q.quiz_id = qs.quiz_id
    LEFT JOIN
        "option" o ON qs.quistion_id = o.quistion_id
    WHERE
        e.student_id = 2 AND e.progress_state = 'In Progress'
    GROUP BY
        c.course_title, e.progress_state
) AS filtered_courses ON c.course_title = filtered_courses.course_title
ORDER BY
    c.course_title;



--insert data
INSERT INTO Student (first_name, last_name, email, password, education, birth_date, picture)
VALUES ('ahemd', 'Doe', 'john10@example.com', 'password123', 'Computer Science', '1995-05-10', 'profile.jpg');
--
-- إضافة بيانات تجريبية لجدول Levels
INSERT INTO Levels (level_name, level_description)
VALUES ('Beginner', 'Courses for beginners in the field.'),
       ('Intermediate', 'Courses for learners with some experience.'),
       ('Advanced', 'Courses for experienced learners.');
--
-- إضافة بيانات تجريبية لجدول Courses_Type
INSERT INTO Courses_Type (type_name, type_description)
VALUES ('Programming', 'Courses related to programming and software development.'),
       ('Mathematics', 'Courses related to mathematics and numerical analysis.');
--
INSERT INTO Role (role_name)
VALUES ('Instructor'), ('Student');
--
INSERT INTO Users (first_name, last_name, email, password, education, birth_date, picture, manager_id, role_id)
VALUES ('Ahmed', 'Hassan', 'ahmed@example.com', 'password123', 'Computer Science', '1985-03-15', 'ahmed.jpg', NULL, 1),
       ('Sarah', 'Smith', 'sarah@example.com', 'pass456', 'Engineering', '1990-08-22', 'sarah.jpg', NULL, 2);
--
INSERT INTO Course (course_title, course_description, course_duration, items_count, course_status, instructor_id, course_level, course_type)
VALUES ('Introduction', 'A beginner-friendly programming course', 30, 10, 'In Progress', 1, 1, 1),
       ('Advanced Programming', 'An advanced programming course', 45, 15, 'Completed', 1, 2, 1);
--
INSERT INTO Enrollment (strting_date, progress_state, ending_date, course_score, student_id, course_id)
VALUES ('2023-08-01', 3, NULL, NULL, 2, 3),
       ('2023-07-15', 10, '2023-08-15', 90, 2, 2);
--
-- إضافة بيانات تجريبية لجدول Items
INSERT INTO Items (item_title, item_description, item_no, course_id, topic_id)
VALUES ('Introduction to Loops', 'Understanding the concept of loops in programming', 7, 3, NULL),
       ('Object-Oriented Programming Concepts', 'Exploring the fundamentals of OOP', 10, 2, NULL);
--
INSERT INTO Quiz (quiz_points, item_id)
VALUES (20, 3), (30, 4);

INSERT INTO Question (question_body, question_no, question_points, quiz_id)
VALUES ('What is a loop?', 1, 10, 3), ('What is OOP?', 1, 15, 4);

INSERT INTO Option (option_body, is_correct, option_no, question_id)
VALUES ('A programming construct', TRUE, 1, 1),
       ('An animal sound', FALSE, 2, 2),
       ('Object-Oriented Programming', FALSE,2, 1),
       ('Ocean Observation Protocol', true, 2, 2);
--
-- إدراج بيانات في جدول Student_Answers
INSERT INTO Student_Answers (quiz_no, question_no, option_no, enrollment_id)
VALUES
    (3, 1, 1,5);
    -- (3, 1, 2, 3);
     DELETE FROM Student_Answers WHERE enrollment_id=3;

-- إضافة بيانات لجدول Roadmap
INSERT INTO Roadmap (roadmap_title, roadmap_description)
VALUES
    ('Programming Roadmap', 'A roadmap for learning programming from scratch.'),
    ('Data Science Roadmap', 'A roadmap for becoming a data scientist.'),
    ('Web Development Roadmap', 'A roadmap to become a web developer.');

-- إضافة بيانات لجدول Managing_Roadmaps
INSERT INTO Managing_Roadmaps (roadmap_id, employee_id)
VALUES
    (1, 1),
    (2, 1), 
    (3, 2); 

--
ALTER TABLE enrollment
ALTER COLUMN progress_state TYPE INT
USING progress_state::integer;
--
SELECT
    c.course_title,
    e.progress_state,
    e.course_score,
    COALESCE(SUM(qs.question_points), 0) AS total_points,
    COUNT(CASE WHEN e.progress_state = 'In Progress' THEN 1 END) AS courses_in_progress,
    COUNT(CASE WHEN e.progress_state = 'Completed' THEN 1 END) AS courses_completed
FROM
    "course" c
JOIN
    "enrollment" e ON c.course_id = e.course_id
LEFT JOIN
    "items" i ON c.course_id = i.course_id
LEFT JOIN
    "quiz" q ON q.item_id = i.item_id
LEFT JOIN
    "quistion" qs ON q.quiz_id = qs.quiz_id
LEFT JOIN
    "option" o ON qs.quistion_id = o.quistion_id
WHERE
    e.student_id = 1
GROUP BY
    c.course_title, e.progress_state, e.course_score
ORDER BY
    c.course_title;


-- التعليمة بعد تعديل insert :
SELECT
    e.student_id,
    SUM(CASE WHEN e.progress_state >= i.item_no THEN 1 ELSE 0 END) AS completed_courses,
    SUM(CASE WHEN e.progress_state < i.item_no THEN 1 ELSE 0 END) AS incomplete_courses
FROM Enrollment e
JOIN Items i ON e.course_id = i.course_id
WHERE e.student_id = 1
GROUP BY e.student_id;
-- التعليمة ل total point=> after that we need to Sum points
SELECT
    sa.enrollment_id,
    SUM(CASE WHEN o.is_correct THEN 1 ELSE 0 END) AS points
FROM
    Student_Answers sa
INNER JOIN
    Option o ON sa.option_no = o.option_no AND sa.question_no = o.question_id 
GROUP BY
    sa.enrollment_id;

 enrollment_id | points
---------------+--------
             3 |      0
             4 |      1
(2 rows)
SELECT enrollment_id, SUM(CASE WHEN o.is_correct THEN 1 ELSE 0 END) AS total_points
FROM Student_Answers sa
INNER JOIN Option o ON sa.option_no = o.option_no AND sa.question_no = o.question_id 
GROUP BY enrollment_id
HAVING SUM(CASE WHEN o.is_correct THEN 1 ELSE 0 END) = 1;


maptow=#

-- completed course
SELECT c.course_id, c.course_title, c.course_description
FROM "course" c 
JOIN "enrollment" e ON c.course_id = e.course_id
LEFT JOIN
    "items" i ON c.course_id = i.course_id
WHERE e.student_id = 1 AND e.progress_state >= i.item_no
ORDER BY c.course_title;


-- inprogres course note=> we don't have a image
SELECT c.course_id, c.course_title, c.course_description
FROM "course" c 
JOIN "enrollment" e ON c.course_id = e.course_id
LEFT JOIN
    "items" i ON c.course_id = i.course_id
WHERE e.student_id = 2 AND e.progress_state < i.item_no
ORDER BY c.course_title;
--- total point to one student
WITH PointsPerEnrollment AS (
    SELECT
        e.enrollment_id,
        SUM(CASE WHEN o.is_correct THEN 1 ELSE 0 END) AS points
    FROM
        enrollment e
    INNER JOIN
        Student_Answers sa ON e.enrollment_id = sa.enrollment_id
    INNER JOIN
        Option o ON sa.option_no = o.option_no AND sa.question_no = o.question_id 
    WHERE
        e.student_id = 2
    GROUP BY
        e.enrollment_id
)
SELECT
    SUM(points) AS total_points
FROM
    PointsPerEnrollment;

-- النسبة المئوية
SELECT
    e.student_id,
    e.course_id,
    ROUND(
        CASE
            WHEN e.progress_state = i.item_no THEN 100
            ELSE (e.progress_state::float / i.item_no) * 100
        END
    ) AS completion_percentage
FROM
    Enrollment e
JOIN
    Items i ON e.course_id = i.course_id
WHERE
    e.student_id = 2
    AND e.progress_state IS NOT NULL
    AND (e.progress_state::float / i.item_no) * 100 < 100;

-- 

SELECT
    e.student_id,
    MIN(e.course_id) AS course_id,  
    ROUND(
        AVG(
            CASE
                WHEN i.item_no = e.progress_state THEN 100
                ELSE (e.progress_state::float / i.item_no) * 100
            END
        )
    ) AS completion_percentage
FROM
    enrollment e
JOIN
    items i ON e.course_id = i.course_id
WHERE
    e.student_id = 2
    AND e.progress_state IS NOT NULL
    AND (i.item_no = e.progress_state OR i.item_no > e.progress_state)
GROUP BY
    e.student_id;
-- كل تقدم الطلاب سواء مكتمل أو غير مكتمل
SELECT
    e.student_id,
    c.course_id,
    ROUND(
        CASE
            WHEN i.item_no = e.progress_state THEN 100
            ELSE (e.progress_state::float / i.item_no) * 100
        END
    ) AS completion_percentage
FROM
    Course c
JOIN
    Items i ON c.course_id = i.course_id
LEFT JOIN
    Enrollment e ON c.course_id = e.course_id
WHERE
    (e.progress_state IS NULL OR e.progress_state <= i.item_no);

-- لطالب معين مع 100
SELECT
    e.student_id,
    c.course_id,
    ROUND(
        CASE
            WHEN i.item_no = e.progress_state THEN 100
            ELSE (e.progress_state::float / i.item_no) * 100
        END
    ) AS completion_percentage
FROM
    Course c
JOIN
    Items i ON c.course_id = i.course_id
LEFT JOIN
    Enrollment e ON c.course_id = e.course_id
WHERE
    (e.progress_state IS NULL OR e.progress_state <= i.item_no)
    AND e.student_id = 2; 
-- النسبة بدون 100
SELECT
    e.student_id,
    c.course_id,
    ROUND(
        CASE
            WHEN i.item_no = e.progress_state THEN 100
            ELSE (e.progress_state::float / i.item_no) * 100
        END
    ) AS completion_percentage
FROM
    Course c
JOIN
    Items i ON c.course_id = i.course_id
LEFT JOIN
    Enrollment e ON c.course_id = e.course_id
WHERE
    (e.progress_state IS NULL OR e.progress_state <= i.item_no)
    AND e.student_id = 1
    AND (e.progress_state != i.item_no OR e.progress_state IS NULL);

-- Get The Rating لكل الكورسات 
    SELECT
        c.course_id,
        c.course_title,
        c.course_description,
        r.stars_number
    FROM "course" c
    JOIN "enrollment" e ON c.course_id = e.course_id
    LEFT JOIN "rating" r ON e.enrollment_id = r.enrollment_id
    LEFT JOIN "items" i ON c.course_id = i.course_id AND (e.progress_state IS NULL OR e.progress_state < i.item_no)
    WHERE e.student_id = 2
    ORDER BY c.course_title;



-- الكود المكتمل لإرجاع عدد النجوم للكورسات غير المكتملة 
SELECT
    c.course_id,
    c.course_title,
    c.course_description,
    r.stars_number
FROM "course" c
JOIN "enrollment" e ON c.course_id = e.course_id
LEFT JOIN "rating" r ON e.enrollment_id = r.enrollment_id
LEFT JOIN "items" i ON c.course_id = i.course_id AND (e.progress_state IS NULL OR e.progress_state < i.item_no)
WHERE e.student_id = 2 AND (e.progress_state IS NULL OR e.progress_state < i.item_no)
ORDER BY c.course_title;

--stars to in proger cpurse by Common Table Expressions (CTE)
WITH IncompleteCourses AS (
    SELECT c.course_id, c.course_title
    FROM "course" c
    JOIN "enrollment" e ON c.course_id = e.course_id
    LEFT JOIN "items" i ON c.course_id = i.course_id
    WHERE e.student_id = 1 AND e.progress_state < i.item_no
)
SELECT
    ic.course_id,
    ic.course_title,
    AVG(r.stars_number) AS average_rating
FROM IncompleteCourses ic
LEFT JOIN "enrollment" e ON ic.course_id = e.course_id
LEFT JOIN "rating" r ON e.enrollment_id = r.enrollment_id
GROUP BY ic.course_id, ic.course_title
ORDER BY ic.course_title;


-- insert data to topic
INSERT INTO Topic_Level_1 (topic_title, topic_description, topic_status, roadmap_id)
VALUES
    ('Introduction to Programming', 'An overview of programming concepts', 'Active', 1),
    ('Data Structures and Algorithms', 'Exploring common data structures and algorithms', 'Inactive', 2),
    ('Web Development Basics', 'Getting started with web development', 'Active', 3);

    -- إدراج بيانات في جدول Topic_Level_N
INSERT INTO Topic_Level_N (topic_title, topic_description, topic_status, topic_level, top_level_topic_id, topic_level1_id)
VALUES
    ('Variables and Data Types', 'Understanding variables and different data types', 'Active', 1, NULL, 1),
    ('Conditional Statements', 'Exploring if-else statements and switch cases', 'Active', 2, 19, 1),
    ('Linked Lists', 'Understanding linked list data structure', 'Active', 3, 20, 2), 
    ('Arrays and Matrices', 'Exploring arrays and matrix data structures', 'Active', 4, 21, 2), 
    ('HTML Basics', 'Introduction to HTML markup', 'Active', 5, 22, 3), 
    ('CSS Styling', 'Styling web pages using CSS', 'Active', 6, 23, 3); 

UPDATE topic_level_1
SET topic_order = 3
WHERE topic_level1_id = 3;

UPDATE items
SET topic_id = 20
WHERE item_id = 4;

UPDATE items
SET topic_id = 21
WHERE item_id = 6;
 


-- popular roadmap
SELECT Roadmap.*, COUNT(Enrollment.enrollment_id) AS enrollment_count
FROM Roadmap
JOIN Topic_Level_1 ON Roadmap.roadmap_id = Topic_Level_1.roadmap_id
JOIN Topic_Level_N ON Topic_Level_1.topic_level1_id = Topic_Level_N.topic_level1_id
JOIN Items ON Topic_Level_N.topic_id = Items.topic_id
JOIN Course ON Items.course_id = Course.course_id
JOIN Enrollment ON Course.course_id = Enrollment.course_id
GROUP BY Roadmap.roadmap_id, Roadmap.roadmap_title, Roadmap.roadmap_description, Roadmap.image_path
ORDER BY enrollment_count DESC
LIMIT 3;

-- تعليمة تحسب إشتراك طالب معين في كل كورس على حدا
SELECT Course.*, COUNT(Enrollment.enrollment_id) AS enrollment_count
FROM Course
JOIN Enrollment ON Course.course_id = Enrollment.course_id
WHERE Enrollment.student_id = 2
GROUP BY Course.course_id, Course.course_title, Course.course_description, Course.course_duration, Course.items_count, Course.course_status, Course.instructor_id, Course.course_level, Course.course_type
ORDER BY enrollment_count DESC;

-- الإشتراك على كل الكورسات
SELECT COUNT(DISTINCT Course.course_id) AS total_enrollments
FROM Course
JOIN Enrollment ON Course.course_id = Enrollment.course_id
WHERE Enrollment.student_id = 2;

--insert to 33 && 34
INSERT INTO items_types(type_name) VALUES('article'),('video'),('quiz');

Insert INTO completed_items(type_id,enrollment_id) VALUES(1,3),(1,4),(2,5),(3,3),(2,4);

-- عدد المقالات وعدد الفيديو وعدد الكويز 
SELECT
    COUNT(CASE WHEN it.type_name = 'article' THEN 1 END) AS article_count,
    COUNT(CASE WHEN it.type_name = 'video' THEN 1 END) AS video_count,
    COUNT(CASE WHEN it.type_name = 'quiz' THEN 1 END) AS quiz_count
FROM
    enrollment e
JOIN
    completed_items ci ON e.enrollment_id = ci.enrollment_id
JOIN
    items_types it ON ci.type_id = it.type_id
WHERE
    e.student_id = 1;
-- roadmap+topic by ID without sigin
SELECT
    r.*,
    tl1.*,
    COUNT(i.item_id) AS item_count
FROM
    Roadmap r
JOIN
    Topic_Level_1 tl1 ON r.roadmap_id = tl1.roadmap_id
JOIN
    Topic_Level_N n ON tl1.topic_level1_id = n.topic_level1_id
LEFT JOIN
    Items i ON n.topic_id = i.topic_id
WHERE
    r.roadmap_id = 2
GROUP BY
    r.roadmap_id, r.roadmap_title, r.roadmap_description,
    tl1.topic_level1_id, tl1.topic_title, tl1.topic_description
ORDER BY
    tl1.topic_level1_id;
-- secound try ** 
SELECT
    Roadmap.*,
    Topic_Level_1.*
FROM
    Roadmap
JOIN
    Topic_Level_1 ON Roadmap.roadmap_id = Topic_Level_1.roadmap_id
WHERE
    Roadmap.roadmap_id = 2;

--insert into Progress_Status
INSERT INTO Topic_States (state_id, state_name)
VALUES
    (1, 'Not Started'),
    (2, 'In Progress'),
    (3, 'Completed');

INSERT INTO Progress_Status (topic_title, student_id, state_id)
VALUES
    ('Introduction to Programming', 1, 1),
    ('Data Structures and Algorithms', 1, 2),
    ('Web Development Basics', 1, 2),
    ('Introduction to Programming', 2, 1),
    ('Introduction to Programming', 2, 3);


--roadmap+topic by ID with sigin to student

SELECT
    Roadmap.*,
    Topic_Level_1.*,
    Progress_Status.state_id AS topic_state_id,
    Topic_States.state_name AS topic_state_name
FROM
    Roadmap
JOIN
    Topic_Level_1 ON Roadmap.roadmap_id = Topic_Level_1.roadmap_id
LEFT JOIN
    Progress_Status ON Topic_Level_1.topic_level1_id = Progress_Status.topic_level1_id
LEFT JOIN
    Topic_States ON Progress_Status.state_id = Topic_States.state_id
WHERE
    Roadmap.roadmap_id = 2
    AND Progress_Status.student_id = 2; 

--
ALTER USER postgres PASSWORD '123';
ALTER DATABASE maptow RENAME TO roadmap;



