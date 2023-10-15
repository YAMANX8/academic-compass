-- All instructions executed on the database are written here
-- UTF8
SELECT datname, pg_encoding_to_char(encoding) FROM pg_database WHERE datname = 'maptow';
-- change pass && database name
ALTER USER postgres PASSWORD '123';
ALTER DATABASE maptow RENAME TO roadmap;
-- change COLUMN password character in student from 50 to 100 
ALTER TABLE student
ALTER COLUMN image_path TYPE character varying(150);
-- add new column to table
ALTER TABLE table_name
ADD COLUMN new_column_name data_type;

ALTER TABLE course
ADD COLUMN subtitle VARCHAR(150);

ALTER TABLE student
ADD COLUMN role_id INT;

ALTER TABLE topic_level_1
ADD COLUMN topic_order character varying(50);

ALTER TABLE roadmap
ALTER COLUMN image_path TYPE character varying(150);

ALTER TABLE student RENAME COLUMN image_path TO picture;

-- example
ALTER TABLE roadmap
ADD COLUMN image_path VARCHAR(150);

ALTER TABLE Progress_Status
ADD COLUMN topic_id INT NOT NULL;

ALTER TABLE Progress_Status
ADD COLUMN topic_level INT NOT NULL DEFAULT 0;

ALTER TABLE rating
ADD COLUMN review TEXT;

UPDATE Progress_Status
SET topic_id =2 WHERE progress_id=10;

UPDATE topic_level_1
SET roadmap_id =19 WHERE topic_level1_id=3;

UPDATE roadmap
SET roadmap_description ='Backend is the foundation of web systems, handling data, logic, and server operations hidden from users. It employs languages like Python, Java, or PHP to manage databases, process requests, and ensure seamless functionality, enabling frontend interaction and powering the entire application.' WHERE roadmap_id=19;

UPDATE topic_level_1
SET topic_title ='',topic_description='The Internet is a global network of computers connected to each other which communicate through a standardized set of protocols..'   WHERE  topic_level1_id=2;
UPDATE topic_level_1
SET topic_order=1   WHERE  topic_level1_id=2;
UPDATE topic_level_N
SET topic_level1_id =1 WHERE topic_id=19;
UPDATE topic_level_N
SET topic_level1_id =NULL WHERE topic_id=20;
UPDATE topic_level_N
SET topic_level1_id =2 WHERE topic_id=21;
UPDATE topic_level_N
SET topic_level1_id =NULL WHERE topic_id=22;
UPDATE topic_level_N
SET topic_level1_id =3 WHERE topic_id=23;

UPDATE course
SET course_level=2 WHERE course_id=11;

UPDATE items
SET topic_id =25 WHERE item_id=6;

UPDATE rating
SET review = 'keep going sir' 
WHERE rating_id = 5;

-- drop column
ALTER TABLE Progress_Status
DROP COLUMN topic_level;

ALTER TABLE student
DROP COLUMN picture;

-- change COLUMN password character in register_request from 50 to 100 
ALTER TABLE register_request
ALTER COLUMN password TYPE character varying(100);

-- Add Add values to a table (Note These values are constant)
INSERT INTO role_permission (role_id,permission_id)
VALUES
  (1,17);




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
VALUES ('Introduction to Programming', 'A beginner-friendly programming course', 30, 10, 'In Progress', 1, 1, 1),
       ('Advanced Programming', 'An advanced programming course', 45, 15, 'Completed', 1, 2, 1);
--
INSERT INTO Enrollment (strting_date, progress_state, ending_date, course_score, student_id, course_id)
VALUES ('2023-08-01', 3, NULL, NULL, 3, 6),
 ('2023-08-01', 3, NULL, NULL, 2, 7),
 ('2023-08-01', 3, NULL, NULL, 1, 8),
 ('2023-08-01', 3, NULL, NULL, 2, 9),
 ('2023-08-01', 3, NULL, NULL, 1, 10),
 ('2023-08-01', 3, NULL, NULL, 2, 11),
       ('2023-07-15', 10, '2023-08-15', 90, 2, 2);
--
-- إضافة بيانات تجريبية لجدول Items
INSERT INTO Items (item_title, item_description, item_no, course_id, topic_id)
VALUES ('Introduction to Loops', 'Understanding the concept of loops in programming', 7, 3, 26),
       ('Object-Oriented Programming Concepts', 'Understanding the concept of loops in programming', 7, 3, 27),
       ('Introduction to Loops', 'Understanding the concept of loops in programming', 7, 8,19 ),
       ('Object-Oriented Programming Concepts', 'Understanding the concept of loops in programming', 7, 9, 21),
       ('Introduction to Loops', 'Understanding the concept of loops in programming', 7, 10, 19),
       ('Object-Oriented Programming Concepts', 'Understanding the concept of loops in programming', 7, 11, 21),
       ('Object-Oriented Programming Concepts', 'Exploring the fundamentals of OOP', 10, 2, NULL);
--
INSERT INTO rating(stars_number,review,enrollment_id) VALUES(1,'bad',16),(5,12),(5,13),(5,14),(5,15);
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
     DELETE FROM topic_level_N WHERE topic_id=25;
     DELETE FROM topic_level_N WHERE topic_id=26;
     DELETE FROM topic_level_N WHERE topic_id=27;
     DELETE FROM topic_level_1 WHERE topic_level1_id=9;
     DELETE FROM items WHERE item_id=6;
     DELETE FROM roadmap;

-- اضافة بيانات الى جدول List_Type 
INSERT INTO List_Type (type_name) VALUES ('In this course you will learn the following');

-- اضافة بيانات الى جدول Course_Lists
INSERT INTO Course_Lists (item_body, item_order, list_type, course_id)
VALUES
  ('Work with one of the most in-demand web development programming languages', 1, 1, 1), 
  ('& Beginner or advanced web developers who want to dive into backend (server-side) development with NodeJS', 2, 2, 1), 
  ('General knowledge of how the web works is recommended but not a must-have', 3, 3, 1); 

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

--completed_courses number
--incomplete_courses number
SELECT
    e.student_id,
    SUM(CASE WHEN e.progress_state >= i.item_no THEN 1 ELSE 0 END) AS completed_courses,
    SUM(CASE WHEN e.progress_state < i.item_no THEN 1 ELSE 0 END) AS incomplete_courses
FROM Enrollment e
JOIN Items i ON e.course_id = i.course_id
WHERE e.student_id = 1
GROUP BY e.student_id;
--update It was completed
SELECT
    e.student_id,
    SUM(CASE WHEN e.progress_state >= c.items_count THEN 1 ELSE 0 END) AS completed_courses,
    SUM(CASE WHEN e.progress_state < c.items_count THEN 1 ELSE 0 END) AS incomplete_courses
FROM Enrollment e
JOIN course c ON e.course_id = c.course_id
WHERE e.student_id = $1
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


-- completed course
SELECT c.course_id, c.course_title, c.course_description
FROM "course" c 
JOIN "enrollment" e ON c.course_id = e.course_id
LEFT JOIN
    "items" i ON c.course_id = i.course_id
WHERE e.student_id = 1 AND e.progress_state >= i.item_no
ORDER BY c.course_title;
-- update it was completed
SELECT c.course_id, c.course_title, c.course_description
FROM "course" c 
JOIN "enrollment" e ON c.course_id = e.course_id
WHERE e.student_id = $1 AND e.progress_state >= c.items_count
ORDER BY c.course_title;


-- inprogres course note=> we don't have a image
SELECT c.course_id, c.course_title, c.course_description
FROM "course" c 
JOIN "enrollment" e ON c.course_id = e.course_id
LEFT JOIN
    "items" i ON c.course_id = i.course_id
WHERE e.student_id = 2 AND e.progress_state < i.item_no
ORDER BY c.course_title;
--update it was completed
SELECT c.course_id, c.course_title, c.course_description,c.course_thumnail
FROM "course" c 
JOIN "enrollment" e ON c.course_id = e.course_id
WHERE e.student_id = $1 AND e.progress_state < c.items_count
ORDER BY c.course_title;
--- total point to one student 
--quize
-- المسار
-- it was Completed
WITH PointsPerEnrollment AS (
SELECT
        e.enrollment_id,
        SUM(CASE WHEN o.is_correct THEN 1 ELSE 0 END) AS points
    FROM
        enrollment e
    INNER JOIN
        Student_Answers sa ON e.enrollment_id = sa.enrollment_id
    LEFT JOIN
        course c ON   e.course_id = c.course_id
    LEFT JOIN
        items i ON   c.course_id = i.item_id
    LEFT JOIN
        quiz q ON   i.item_id = q.quiz_id
    INNER JOIN
        Option o ON sa.option_no = o.option_no AND sa.question_no = o.question_id
    WHERE
        e.student_id = $1
    GROUP BY
        e.enrollment_id
)
 SELECT
     SUM(points) AS total_points
 FROM
     PointsPerEnrollment;
--


-- النسبة المئوية
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
-- النسبة بدون 100 update it was completed
SELECT
    e.student_id,
    c.course_id,
    ROUND(
        CASE
            WHEN c.items_count = e.progress_state THEN 100
            ELSE (e.progress_state::float / c.items_count) * 100
        END
    ) AS completion_percentage
FROM
    Course c
LEFT JOIN
    Enrollment e ON c.course_id = e.course_id
WHERE
    (e.progress_state IS NULL OR e.progress_state <= c.items_count)
    AND e.student_id = 2
    AND (e.progress_state != c.items_count OR e.progress_state IS NULL);

-- Get The Rating Update it was completed
    SELECT
        c.course_id,
        r.stars_number
    FROM "course" c
    JOIN "enrollment" e ON c.course_id = e.course_id
    LEFT JOIN "rating" r ON e.enrollment_id = r.enrollment_id
    WHERE
    (e.progress_state IS NULL OR e.progress_state <= c.items_count)
    AND e.student_id = $1
    AND (e.progress_state != c.items_count OR e.progress_state IS NULL)
    ORDER BY c.course_title;

-- الكود المكتمل لإرجاع عدد النجوم للكورسات غير المكتملة **
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


-- insert data to topic(ther is topic_order +++)
INSERT INTO Topic_Level_1 (topic_title, topic_description, topic_status, roadmap_id, topic_order,category_id)
VALUES
    ('test','A while back, developing a mobile app using JavaScript was impossible. But now JavaScript developers can create mobile applications using their knowledge for web development. Here is the list of options to create mobile applications in JavaScript.', 'Active', 17,11,3);
    ('Mobile applications','A while back, developing a mobile app using JavaScript was impossible. But now JavaScript developers can create mobile applications using their knowledge for web development. Here is the list of options to create mobile applications in JavaScript.', 'Active', 18,11,3);


    -- إدراج بيانات في جدول Topic_Level_N
INSERT INTO Topic_Level_N (topic_title, topic_description, topic_status, topic_level, top_level_topic_id, topic_level1_id)
VALUES
    ('vite', 'Understanding variables and different data types', 'Active',1, ,17),
    ('vite', 'Understanding variables and different data types', 'Active',3,19, ),
    ('Conditional Statements', 'Exploring if-else statements and switch cases', 'Active', 2, 19, 1),
    ('Linked Lists', 'Understanding linked list data structure', 'Active', 3, 20, 2), 
    ('Arrays and Matrices', 'Exploring arrays and matrix data structures', 'Active', 4, 21, 2), 
    ('HTML Basics', 'Introduction to HTML markup', 'Active', 5, 22, 3), 
    ('CSS Styling', 'Styling web pages using CSS', 'Active', 6, 23, 3),
    ('Java script', 'Styling web pages using CSS', 'Active', 7, 24, 4); 

UPDATE topic_level_1
SET topic_order = 3
WHERE topic_level1_id = 3;

UPDATE items
SET topic_id = 20
WHERE item_id = 4;

UPDATE items
SET topic_id = 21
WHERE item_id = 6;

UPDATE Option
SET option_no = 1
WHERE option_id = 2;
 


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
    Roadmap.*,
    TL1.*,
    TC.category_name
FROM
    Roadmap
JOIN
    Topic_Level_1 TL1 ON Roadmap.roadmap_id = TL1.roadmap_id
LEFT JOIN Topic_Category TC ON TL1.category_id = TC.category_id
WHERE
    Roadmap.roadmap_id = 18;
--بدون تكرار id
SELECT
    Roadmap.roadmap_id,
    Roadmap.roadmap_title,
    Roadmap.roadmap_description,
    Roadmap.image_path,
    Topic_Level_1.topic_level1_id,
    Topic_Level_1.topic_title,
    Topic_Level_1.topic_description,
    Topic_Level_1.topic_status,
    Topic_Level_1.topic_order
FROM
    Roadmap
JOIN
    Topic_Level_1 ON Roadmap.roadmap_id = Topic_Level_1.roadmap_id
WHERE
    Roadmap.roadmap_id = 1;
--insert into Progress_Status
INSERT INTO Topic_States (state_id, state_name)
VALUES
    (1, 'Not Started'),
    (2, 'In Progress'),
    (3, 'Completed');

INSERT INTO Progress_Status ( topic_id, topic_level,student_id,state_id)
VALUES
    ( 29, 3,5,1),
    ( 30, 2,6,2),
    ( 31, 3,7,3),
    ( 32, 3,8,1),
    ( 33, 3,5,2),
    ( 2,1,8,1),
    ( 3,1,5,2),
    ( 4,1,6,3),
    ( 5,1,7,2);




--roadmap+topic by ID with sigin to student 
-- بدون تكرار roadmap_id#
SELECT
    r.roadmap_id,
    r.roadmap_title,
    r.roadmap_description,
    r.image_path,
    t1.topic_level1_id,
    t1.topic_title,
    t1.topic_description,
    t1.topic_status,
    t1.topic_order,
    ps.progress_id,
    ps.student_id,
    ps.state_id AS progress_state_id,
    ts.state_name
FROM
    Roadmap r
JOIN
    Topic_Level_1 t1 ON r.roadmap_id = t1.roadmap_id
LEFT JOIN
    Progress_Status ps ON t1.topic_level1_id = ps.topic_id
LEFT JOIN
    Topic_States ts ON ps.state_id = ts.state_id
WHERE
    r.roadmap_id = 5
    AND ps.student_id = 1;
-- بدون تكرار و جود شروط للعرض #

SELECT DISTINCT ON (r.roadmap_id)
    r.roadmap_id,
    r.roadmap_title,
    r.roadmap_description,
    t1.topic_level1_id,
    t1.topic_title,
    t1.topic_description,
    t1.topic_status,
    t1.topic_order,
    ps.progress_id,
    ps.student_id,
    ps.state_id AS progress_state_id,
    ps.topic_id,
    ps.topic_level,
    ts.state_name
FROM
    Roadmap r
JOIN
    Topic_Level_1 t1 ON r.roadmap_id = t1.roadmap_id
LEFT JOIN
    Progress_Status ps ON t1.topic_level1_id = ps. AND ps.student_id = 5
LEFT JOIN
    Topic_States ts ON ps.state_id = ts.state_id
WHERE

    r.roadmap_id = 17
ORDER BY
    r.roadmap_id, t1.topic_level1_id, ps.progress_id;

 --Update It was completed
SELECT DISTINCT ON (r.roadmap_id)
    r.roadmap_id,
    r.roadmap_title,
    r.roadmap_description,
    TL1.topic_level1_id,
    TL1.topic_title,
    TL1.topic_description,
    TL1.topic_status,
    TL1.topic_order,
    ps.progress_id,
    ps.student_id,
    ps.state_id AS progress_state_id,
    ps.topic_id,
    ps.topic_level,
    ts.state_name
FROM
    Roadmap r
 JOIN
    Topic_Level_1 TL1 ON r.roadmap_id = TL1.roadmap_id
 JOIN
    Topic_Level_N TLN ON TL1.topic_level1_id = TLN.topic_level1_id
 JOIN
    Items I ON TLN.topic_id = I.topic_id
 JOIN
    Course C ON I.course_id = C.course_id
 JOIN
    Enrollment E ON C.course_id = E.course_id
 JOIN
    Student S ON E.student_id = S.student_id
 JOIN
    -- Progress_Status ps ON TLN.topic_level = ps.topic_level   AND ps.student_id = 2
    --Progress_Status ps ON TL1.topic_level1_id = ps.topic_id   AND ps.student_id = 2 + delete this line(    TLN.topic_id = ps.topic_id AND)
    Progress_Status ps ON TL1.topic_level1_id = ps.topic_id AND ps.topic_level=1  AND ps.student_id = 1
LEFT JOIN
    Topic_States ts ON ps.state_id = ts.state_id
WHERE
    r.roadmap_id = 18
ORDER BY
    r.roadmap_id, TL1.topic_level1_id, ps.progress_id;

---- إرجاع كافة topic_level_1 لخريطة معينة مع التعديلات سابقا يتم إرجاع topic واحد الذي يساوي  ps.topic_id (هاي الي زبطت بالنهاية)
SELECT DISTINCT ON (r.roadmap_id, TL1.topic_level1_id)
    r.roadmap_id,
    r.roadmap_title,
    r.roadmap_description,
    TL1.topic_level1_id,
    TL1.topic_title,
    TL1.topic_description,
    TL1.topic_status,
    TL1.topic_order,
    ps.progress_id,
    ps.student_id,
    ps.state_id AS progress_state_id,
    ps.topic_id,
    ps.topic_level,
    ts.state_name
FROM
    Roadmap r
JOIN
    Topic_Level_1 TL1 ON r.roadmap_id = TL1.roadmap_id
LEFT JOIN Progress_Status ps ON TL1.topic_level1_id = ps.topic_id AND ps.topic_level = 1 AND ps.student_id = 1
LEFT JOIN Topic_States ts ON ps.state_id = ts.state_id
WHERE
    r.roadmap_id = 18 
ORDER BY
    r.roadmap_id, TL1.topic_level1_id, ps.progress_id;
---- is last in topic level 1 
SELECT DISTINCT ON (r.roadmap_id, TL1.topic_level1_id)
    r.roadmap_id,
    r.roadmap_title,
    r.roadmap_description,
    TL1.topic_level1_id,
    TL1.topic_title,
    TL1.topic_description,
    TL1.topic_status,
    TL1.topic_order,
    TC.category_name, 
    ps.progress_id,
    ps.student_id,
    ps.state_id AS progress_state_id,
    ps.topic_id,
    ps.topic_level,
    ts.state_name,
    CASE
        WHEN EXISTS (
            SELECT 1
            FROM topic_level_N TLN
            WHERE TLN.topic_level1_id = TL1.topic_level1_id
        ) THEN FALSE
        ELSE TRUE
    END AS is_last
FROM
    Roadmap r
JOIN
    Topic_Level_1 TL1 ON r.roadmap_id = TL1.roadmap_id
LEFT JOIN Topic_Category TC ON TL1.category_id = TC.category_id
LEFT JOIN Progress_Status ps ON TL1.topic_level1_id = ps.topic_id AND ps.topic_level = 1 AND ps.student_id = 5
LEFT JOIN Topic_States ts ON ps.state_id = ts.state_id

WHERE
    r.roadmap_id = 18 
ORDER BY
    r.roadmap_id, TL1.topic_level1_id, ps.progress_id;


-- جلب كل الخرائط التي اشترك بها الطالب(my roadmap)
SELECT DISTINCT
    R.roadmap_title
FROM
    Roadmap R
JOIN
    Topic_Level_1 TL1 ON R.roadmap_id = TL1.roadmap_id
JOIN
    Topic_Level_N TLN ON TL1.topic_level1_id = TLN.topic_level1_id
JOIN
    Items I ON TLN.topic_id = I.topic_id
JOIN
    Course C ON I.course_id = C.course_id
JOIN
    Enrollment E ON C.course_id = E.course_id
WHERE
    E.student_id = 6;

-- search
---
SELECT DISTINCT
    c.course_id,
    c.course_title,
    c.course_description,
    l.level_name,
    rt.rating_stars,
    string_agg(tl1.topic_title, ', ') AS topics_covered,
    string_agg(tln.topic_title, ', ') AS additional_topics_covered
FROM
    Course c
JOIN
    Levels l ON c.course_level = l.level_id
JOIN
    Courses_Type ct ON c.course_type = ct.type_id
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
    Course_Lists cl ON c.course_id = cl.course_id
JOIN
    List_Type lt ON cl.list_type = lt.type_id
JOIN
    Topic_Level_1 tl1 ON cl.item_body = tl1.topic_title
LEFT JOIN (
    SELECT DISTINCT
        tln.topic_title,
        tln.topic_level1_id
    FROM
        Topic_Level_N tln
    JOIN
        Topic_Level_1 tl1 ON tln.topic_level1_id = tl1.topic_level1_id
) tln ON tln.topic_level1_id = tl1.topic_level1_id
WHERE
    tl1.topic_title IN ('Introduction to Programming', 'Data Structures and Algorithms', 'Web Development Basics')
    AND l.level_name IN ('Beginner', 'Intermediate', 'Advanced')
    AND rt.rating_stars >= 4.5
GROUP BY
    c.course_id, c.course_title, c.course_description, l.level_name, rt.rating_stars;

---
SELECT DISTINCT
    c.course_id,
    c.course_title,
    c.course_description,
    l.level_name,
    rt.rating_stars,
    string_agg(tl1.topic_title, ', ') AS topics_covered,
    string_agg(tln.topic_title, ', ') AS additional_topics_covered
FROM
    Course c
JOIN
    Levels l ON c.course_level = l.level_id
JOIN
    Courses_Type ct ON c.course_type = ct.type_id
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
    Course_Lists cl ON c.course_id = cl.course_id
JOIN
    List_Type lt ON cl.list_type = lt.type_id
JOIN
    Topic_Level_1 tl1 ON cl.item_body = tl1.topic_title
LEFT JOIN (
    SELECT DISTINCT
        tln.topic_title,
        tln.topic_level1_id
    FROM
        Topic_Level_N tln
    JOIN
        Topic_Level_1 tl1 ON tln.topic_level1_id = tl1.topic_level1_id
) tln ON tln.topic_level1_id = tl1.topic_level1_id
WHERE
    tl1.topic_title IN ('Variables and Data Types')
    AND l.level_name IN ('Beginner')
    AND rt.rating_stars >= 4.5
    AND c.course_title ILIKE '%' || 'Introduction to Programming' || '%'
GROUP BY
    c.course_id, c.course_title, c.course_description, l.level_name, rt.rating_stars;
    --
    SELECT DISTINCT
    c.course_id,
    c.course_title,
    c.course_description,
    l.level_name,
    rt.rating_stars,
    string_agg(tl1.topic_title, ', ') AS topics_covered,
    string_agg(tln.topic_title, ', ') AS additional_topics_covered
FROM
    Course c
JOIN
    Levels l ON c.course_level = l.level_id
JOIN
    Courses_Type ct ON c.course_type = ct.type_id
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
    Course_Lists cl ON c.course_id = cl.course_id
JOIN
    List_Type lt ON cl.list_type = lt.type_id
JOIN
    Topic_Level_1 tl1 ON cl.item_body = tl1.topic_title
LEFT JOIN (
    SELECT DISTINCT
        tln.topic_title,
        tln.topic_level1_id,
        i.course_id
    FROM
        Topic_Level_N tln
    JOIN
        Topic_Level_1 tl1 ON tln.topic_level1_id = tl1.topic_level1_id
    JOIN
        Items i ON tln.topic_id = i.topic_id
) tln ON tln.topic_level1_id = tl1.topic_level1_id
WHERE
    tl1.topic_title IN ('Variables and Data Types')
    AND l.level_name IN ('Beginner')
    AND rt.rating_stars >= 4.5
    AND c.course_title ILIKE '%' || 'Introduction to Programming' || '%'
GROUP BY
    c.course_id, c.course_title, c.course_description, l.level_name, rt.rating_stars;
---جلب معلومات كورس بدون النوع

SELECT DISTINCT 
    r.roadmap_id,
    r.roadmap_title,
    c.course_id,
    c.course_title,
    c.course_description,
    c.course_duration,
    l.level_name,
    u.first_name,
    u.last_name,
    rt.rating_stars,
    ct.type_name,
    i.item_no,
    TLN.topic_title
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
    l.level_name IN ('Beginner')
    AND rt.rating_stars >= 4.5
    AND ct.type_name IN ('Programming')
    AND c.course_title ILIKE '%' || 'Introduction to Programming' || '%';
-- أول أربع نتائج
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
        l.level_name IN ('Beginner')
        AND rt.rating_stars >= 4.5
        AND ct.type_name IN ('Programming')
        AND c.course_title ILIKE '%' || 'Introduction to Programming' || '%'
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
    TLN.topic_title
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
    RC.course_rank <= 4
ORDER BY
    RC.roadmap_id,
    RC.course_rank;
---- تم تصنيف النتائج على حسب كل خريطة أولاً ثم تم عرض النتائج المطلوبة بنائاً على شرط     RC.course_rank > ((1 - 1) * 4) --AND RC.course_rank <= (1 * 4)
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
        l.level_name IN ('Beginner')
        AND rt.rating_stars >= 4.5
        AND ct.type_name IN ('Programming')
        AND c.course_title ILIKE '%' || 'Introduction to Programming' || '%'
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
    TLN.topic_title
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
    RC.course_rank > ((1 - 1) * 4) 
    AND RC.course_rank <= (1 * 4)
ORDER BY
    RC.roadmap_id,
    RC.course_rank;

    --- مع total count
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
        l.level_name IN ('Beginner')
        AND rt.rating_stars >= 4.5
        AND ct.type_name IN ('Programming')
        AND c.course_title ILIKE '%' || 'Local SEO Strategies' || '%'
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
    RC.course_rank > ((1 - 1) * 4)
    AND RC.course_rank <= (1 * 4)
ORDER BY
    RC.roadmap_id,
    RC.course_rank;
--معالجة الحالات الخاصة
-------------------
WITH RankedCourses AS (
    SELECT DISTINCT ON (r.roadmap_id, c.course_id)
        r.roadmap_id,
        c.course_id,
       DENSE_RANK() OVER (ORDER BY r.roadmap_id) AS roadmap_rank,
        DENSE_RANK() OVER (PARTITION BY r.roadmap_id ORDER BY c.course_id) AS course_rank
    FROM
        Course c
    JOIN
        Levels l ON c.course_level = l.level_id
    JOIN
        Courses_Type ct ON c.course_type = ct.type_id
    JOIN
        Users u ON c.instructor_id = u.user_id
    LEFT JOIN (
        SELECT DISTINCT
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
(
      (c.course_title IS NOT NULL AND c.course_title ILIKE '%' || 'html' || '%') 
    )
)
, TotalCourseCount AS (
    SELECT COUNT( DISTINCT course_id) AS total_courses 
    FROM RankedCourses
)
SELECT DISTINCT
    RC.roadmap_id,
    r.roadmap_title,
    RC.course_id,
    c.course_title,
    c.subtitle,
    c.course_duration,
    c.items_count,
    c.course_thumnail,
    c.course_status,
    l.level_name,
    u.first_name,
    u.last_name,
    COALESCE(rt.rating_stars, 0.0) AS rating_stars,
    ct.type_name,
    TLN.topic_title,
    (SELECT total_courses FROM TotalCourseCount) AS total_courses
FROM
    RankedCourses RC
 JOIN
    Course c ON RC.course_id = c.course_id
LEFT JOIN
    roadmap r ON RC.roadmap_id = r.roadmap_id
LEFT JOIN
    Levels l ON c.course_level = l.level_id
LEFT JOIN
    Courses_Type ct ON c.course_type = ct.type_id
LEFT JOIN
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
LEFT JOIN
    items i ON c.course_id = i.course_id
LEFT JOIN
    Topic_level_N TLN ON i.topic_id = TLN.topic_id
    WHERE
    RC.course_rank > ((1 - 1) * 4)
    AND RC.course_rank <= (1 * 4)
    AND c.course_status='Active';
ORDER BY
    RC.roadmap_id,
    RC.course_rank;
    --
    UPDATE course
SET course_status ='InActive' WHERE course_id=12;
    ---------
-- searsh by topic
WITH RankedCourses AS (
    SELECT DISTINCT ON (r.roadmap_id, c.course_id)
        r.roadmap_id,
        c.course_id,
       DENSE_RANK() OVER (ORDER BY r.roadmap_id) AS roadmap_rank,
        DENSE_RANK() OVER (PARTITION BY r.roadmap_id ORDER BY c.course_id) AS course_rank
    FROM
        Course c
    JOIN
        Levels l ON c.course_level = l.level_id
    JOIN
        Courses_Type ct ON c.course_type = ct.type_id
    JOIN
        Users u ON c.instructor_id = u.user_id
    LEFT JOIN (
        SELECT DISTINCT
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
    (
        
        ( TLN.topic_id IS NOT NULL AND TLN.topic_id = 35) 
    )
)
, TotalCourseCount AS (
    SELECT COUNT( DISTINCT course_id) AS total_courses 
    FROM RankedCourses
)
SELECT DISTINCT
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
    ct.type_name,
    c.items_count,
    TLN.topic_title AS TLN,
    TL1.topic_title AS TL1,
    
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
    SELECT DISTINCT
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
    RC.course_rank > ((1 - 1) * 4)
    AND RC.course_rank <= (1 * 4);


-- course show
-- course content
SELECT DISTINCT ON (t1.topic_level1_id)
  t1.topic_title AS topic_level_1_title,
  tln.topic_title AS topic_level_n_title,
  q.quiz_id,
  a.article_id,
  v.video_id
FROM
  Course c
  JOIN Items i ON c.course_id = i.course_id
  LEFT JOIN Topic_Level_N tln ON i.topic_id = tln.topic_id
  LEFT JOIN Topic_Level_1 t1 ON tln.topic_level1_id = t1.topic_level1_id
  LEFT JOIN Quiz q ON i.item_id = q.item_id
  LEFT JOIN Article a ON i.item_id = a.item_id
  LEFT JOIN Video v ON i.item_id = v.item_id
WHERE
  c.course_id = 3
ORDER BY
  t1.topic_level1_id,
  tln.topic_id DESC;

--Course_Lists
SELECT
  c.course_id,
  l.type_name,
  cl.item_body AS course_description,
  cl.item_order
FROM Course c
JOIN Course_Lists cl ON c.course_id = cl.course_id
JOIN List_Type l ON cl.list_type = l.type_id
WHERE c.course_id = 1
ORDER BY cl.item_order;

-- إرجاع قيم topic عن طريق id الخاص ب topic معين
WITH RECURSIVE topic_hierarchy AS (
  SELECT topic_id, topic_title, topic_description, topic_status, topic_level, top_level_topic_id, topic_level1_id
  FROM topic_level_N
  WHERE topic_level1_id = 1 AND topic_level=2
  UNION ALL
  SELECT tn.topic_id, tn.topic_title, tn.topic_description, tn.topic_status, tn.topic_level, tn.top_level_topic_id, tn.topic_level1_id
  FROM topic_level_N tn
  INNER JOIN topic_hierarchy th ON tn.top_level_topic_id = th.topic_id
)
SELECT * FROM topic_hierarchy;
-- معدل islast

  SELECT topic_id, topic_title, topic_description, topic_status, topic_level,topic_order,
   CASE
        WHEN EXISTS (
            SELECT 1
            FROM topic_level_N TLN
            WHERE TLN.top_level_topic_id = topic_level_N.topic_id
        ) THEN FALSE
        ELSE TRUE
    END AS is_last
  FROM topic_level_N
  WHERE topic_level1_id = 1 AND topic_level=2;
  --topic level 2 with login
SELECT
   TLN.topic_id AS topic_id_lN,
   TLN.topic_title,
   TLN.topic_description,
   TLN.topic_status,
   TLN.topic_level AS topic_level_lN,
   TLN.topic_order,
   ps.progress_id,
   ps.student_id,
   ps.state_id AS progress_state_id,
   ps.topic_id,
   ps.topic_level,
   ts.state_name,
   CASE
        WHEN EXISTS (
            SELECT 1
            FROM topic_level_N 
            WHERE   TLN.topic_id=topic_level_N.top_level_topic_id
        ) THEN FALSE
        ELSE TRUE
    END AS is_last
  FROM topic_level_N TLN
  LEFT JOIN Progress_Status ps ON TLN.topic_id = ps.topic_id AND ps.topic_level = 2 AND ps.student_id = 5
  LEFT JOIN Topic_States ts ON ps.state_id = ts.state_id
  WHERE TLN.topic_level1_id = 1 AND TLN.topic_level=2;

-- topic_level_N with login
SELECT
   TLN.topic_id AS topic_id_lN,
   TLN.topic_title,
   TLN.topic_description,
   TLN.topic_status,
   TLN.topic_level AS topic_level_lN,
   TLN.topic_order,
   ps.progress_id,
   ps.student_id,
   ps.state_id AS progress_state_id,
   ps.topic_id,
   ps.topic_level,
   ts.state_name,
   CASE
        WHEN EXISTS (
            SELECT 1
            FROM topic_level_N 
            WHERE   TLN.topic_id=topic_level_N.top_level_topic_id
        ) THEN FALSE
        ELSE TRUE
    END AS is_last
  FROM topic_level_N TLN
  LEFT JOIN Progress_Status ps ON TLN.topic_id = ps.topic_id AND ps.topic_level = TLN.topic_level AND ps.student_id = 5
  LEFT JOIN Topic_States ts ON ps.state_id = ts.state_id
  WHERE TLN.top_level_topic_id = 59;

-- topic_level_N without login
SELECT
   TLN.topic_id AS topic_id_lN,
   TLN.topic_title,
   TLN.topic_description,
   TLN.topic_status,
   TLN.topic_level AS topic_level_lN,
   TLN.topic_order,
   CASE
        WHEN EXISTS (
            SELECT 1
            FROM topic_level_N 
            WHERE   TLN.topic_id=topic_level_N.top_level_topic_id
        ) THEN FALSE
        ELSE TRUE
    END AS is_last
  FROM topic_level_N TLN
  WHERE TLN.top_level_topic_id = 19;
--
--database
ALTER TABLE course
DROP COLUMN course_score;

UPDATE course
SET items_count =1 WHERE course_id=1;
UPDATE course
SET items_count =1 WHERE course_id=2;
UPDATE course
SET items_count =0 WHERE course_id=3;
UPDATE course
SET items_count =1 WHERE course_id=4;
UPDATE course
SET items_count =1 WHERE course_id=5;
UPDATE course
SET items_count =1 WHERE course_id=6;
UPDATE course
SET items_count =1 WHERE course_id=7;
UPDATE course
SET items_count =1 WHERE course_id=8;
UPDATE course
SET items_count =1 WHERE course_id=9;
UPDATE course
SET items_count =1 WHERE course_id=10;
UPDATE course
SET items_count =1 WHERE course_id=10;
UPDATE course
SET items_count =1 WHERE course_id=11;

UPDATE enrollment
SET progress_state =0 WHERE enrollment_id=3;
UPDATE enrollment
SET progress_state =1 WHERE enrollment_id=4;
UPDATE enrollment
SET progress_state =0 WHERE enrollment_id=5;
UPDATE enrollment
SET progress_state =1 WHERE enrollment_id=6;
UPDATE enrollment
SET progress_state =0 WHERE enrollment_id=7;
UPDATE enrollment
SET progress_state =0 WHERE enrollment_id=8;
UPDATE enrollment
SET progress_state =0 WHERE enrollment_id=9;
UPDATE enrollment
SET progress_state =0 WHERE enrollment_id=10;
UPDATE enrollment
SET progress_state =0 WHERE enrollment_id=11;
UPDATE enrollment
SET progress_state =0 WHERE enrollment_id=12;
UPDATE enrollment
SET progress_state =0 WHERE enrollment_id=13;
UPDATE enrollment
SET progress_state =0 WHERE enrollment_id=14;
UPDATE enrollment
SET progress_state =0 WHERE enrollment_id=15;

UPDATE levels
SET level_name='Expert' WHERE level_id=3;

UPDATE Completed_Items
SET enrollment_id=6 WHERE completed_item_id=3;

DELETE FROM Completed_Items WHERE completed_item_id=4;
DELETE FROM Completed_Items WHERE completed_item_id=5;
DELETE FROM Completed_Items WHERE completed_item_id=3;

INSERT INTO Topic_Level_N (topic_title, topic_description, topic_status, topic_level, top_level_topic_id, topic_level1_id,topic_order)
VALUES
('Conditional Statements', 'Exploring if-else statements and switch cases', 'Active', 2, 19, 1),
    ('Linked Lists', 'Understanding linked list data structure', 'Active', 3, 20, 2), 
    ('Arrays and Matrices', 'Exploring arrays and matrix data structures', 'Active', 4, 21, 2), 
    ('HTML Basics', 'Introduction to HTML markup', 'Active', 5, 22, 3), 
    ('CSS Styling', 'Styling web pages using CSS', 'Active', 6, 23, 3),
    ('Java script', 'Styling web pages using CSS', 'Active', 7, 24, 4);
------------
    ('Module Bundlers', 'A module bundler is a tool that takes pieces of JavaScript and their dependencies and bundles them into a single file, usually for use in the browser. You may have used tools such as Browserify, Webpack, Rollup or one of many others.It usually starts with an entry file, and from there it bundles up all of the code needed for that entry file.', 'Stable',2,Null, 15,1),
    ('Task Runners', 'Task Runner are tools to simplify certain tedious tasks of development, like automating sass/scss compilation, bundling assets, linting source code, and hot reloading local server.', 'Stable',2,Null, 15,2),
    ('Linters formatters', 'A linter is a tool used to analyze code and discover bugs, syntax errors, stylistic inconsistencies, and suspicious constructs. Popular linters for JavaScript include ESLint, JSLint, and JSHint.', 'Stable',2,Null, 15,3),

    ('Vite', 'Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects.', 'Stable',3,57, NULL,1),
    ('esbuild', 'Our current build tools for the web are 10-100x slower than they could be. The main goal of the esbuild bundler project is to bring about a new era of build tool performance, and create an easy-to-use modern bundler along the way.', 'Stable',3,57, NULL,2),
    ('Webpack', 'Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.', 'Stable',3,57, NULL,3),
    ('Rollup', 'Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application.', 'Stable',3,57, NULL,4),
    ('Parcel', 'Parcel is a web application bundler, differentiated by its developer experience. It offers blazing-fast performance utilizing multicore processing and requires zero configuration.', 'Cutting Edge',3,57, NULL,5),
    --------
    ('How dose the internet work', 'The Internet is a global network of computers connected to each other which communicate through a standardized set of protocols.', 'Stable',2,Null, 2,1),

INSERT INTO Course (course_title,subtitle,course_description, course_duration, items_count, course_status, instructor_id, course_level, course_type,course_thumnail)
VALUES 
-- -- for html basics 
-- ('HTML Basics 3 ',' Learn the Fundamentals of HTML','This course covers the basics of HTML, including tags, elements, and structure. Perfect for beginners.', 45, 6 ,'Active', 1, 1,2,'photo.png'),
-- ('HTML Essentials','Master the Core Concepts of HTML', 'Dive deeper into HTML with this comprehensive course. Learn advanced techniques and best practices.',50, 7 ,'Active', 1,2,2, 'photo.png'),
-- ('HTML Advanced Techniques','Take Your HTML Skills to the Next Level', 'Explore advanced HTML concepts and techniques to create dynamic web content.',55, 6 ,'Active', 1,3,3, 'photo.png');

-- for Basics of SEO
-- ('Local SEO Strategies',' Rank Higher in Local Search Results','Discover the techniques to improve your local SEO presence and reach a local audience effectively.', 35, 5 ,'Active', 1, 1,3, 'photo.png'),
-- ('On-Page SEO Techniques',' Optimize Your Webpages for Better Rankings','Dive deeper into on-page SEO strategies, including content optimization, meta tags, and user experience.', 45, 7 ,'Active', 1, 2,3, 'photo.png'),
-- ('SEO for E-commerce',' Drive Organic Traffic to Your Online Store','Learn how to optimize e-commerce websites for SEO, increase sales, and improve product visibility.', 45, 7 ,'Active', 1, 3,3, 'photo.png');    
-- for CSS Basics
-- ('Introduction to CSS',' Learn the Basics of Cascading Style Sheets','This course introduces you to the fundamentals of CSS, including selectors, properties, and styling web elements.', 25, 5 ,'Active', 1, 1,2, 'photo.png');
-- for Making layouts
-- ('CSS Layout Fundamentals','Learn the Basics of Creating Web Layouts','This course covers the fundamental concepts of creating web layouts using CSS, including box model, positioning, and responsive design principles.', 30, 5 ,'Active', 1, 1,1, 'photo.png'),
-- ('Advanced CSS Layout Techniques','Learn the Advanced of Creating Web Layouts','Master Complex Web Layouts course_description: Dive deeper into CSS layout techniques, including CSS Grid and Flexbox, to create complex and responsive web layouts.', 45, 5 ,'Active', 1, 2,2, 'photo.png');
-- for Responsive Web Design
-- ('Expert Responsive Web Design','Master the Art of Crafting Responsive Websites','This advanced course is tailored for experts in web design and development. Learn the intricacies of creating responsive web designs that adapt seamlessly to various screen sizes and devices. Explore techniques such as fluid layouts, media queries, and mobile-first design strategies. Elevate your skills and ensure your web projects look stunning on all devices.', 55, 5 ,'Active', 1, 3,2, 'photo.png');
-- for build tools\module builder\vite
-- ('Responsive Web Design with Vite','Building Adaptive Websites',' Learn how to create responsive and adaptive websites using Vite, a fast and modern build tool. This course covers the fundamentals of responsive design, CSS techniques, media queries, and how to leverage Vite to optimize your web development workflow. By the end of this course, you will be able to build websites that look great on any device.', 25, 5 ,'Active', 1, 2,3, 'photo.png'),
-- ('Advanced Responsive Web Design with Vite',' Mastering Adaptive Layouts','Take your responsive web design skills to the next level with this advanced course. Learn how to create complex, adaptive layouts, implement advanced CSS techniques, and utilize Vite s powerful features for efficient web development. This course is perfect for web designers and developers looking to create stunning, device-agnostic web experiences.', 45, 5 ,'Active', 1, 3,1, 'photo.png');
-- for build tools\module builder\esbuild

-- ('Introduction to Responsive Web Design with esbuild','Building Your First Responsive Websites','Start your journey into responsive web design and esbuild with this beginner-friendly course. Learn the basics of creating web layouts that adapt to different screen sizes using HTML, CSS, and esbuild. This course will guide you through essential concepts and hands-on exercises to get you started in the world of responsive web development.', 25, 5 ,'Active', 1, 1,3, 'photo.png'),
-- ('Responsive Web Design with esbuild','Creating Efficient and Fast Websites',' Dive into the world of responsive web design while harnessing the power of esbuild, a lightning-fast build tool. This course teaches you the essentials of responsive design, including fluid layouts, media queries, and esbuild s role in optimizing your website s performance. By the end of this course, you will be building responsive websites that load in the blink of an eye.', 25, 5 ,'Active', 1, 2,1, 'photo.png'),
-- ('Advanced Responsive Web Design with esbuild','Mastering Performance-Oriented Layouts',' Elevate your responsive web design skills to an advanced level with this course. Explore advanced CSS techniques, efficient layout strategies, and how esbuild can supercharge your development workflow. Ideal for web designers and developers looking to create highly performant and responsive websites.', 35, 5 ,'Active', 1, 3,2, 'photo.png');
-- for build tools\Task Runners\npm Scripts
-- ('Task Runners with npm Scripts','Automate Your Development Workflow','Discover the power of npm Scripts as a versatile task runner for automating various development tasks. In this course, you will learn how to set up and configure npm Scripts, automate common build processes, optimize your projects workflow, and manage dependencies effectively. By the end of this course, you will have the skills to streamline your development tasks using npm Scripts.', 45, 5 ,'Active', 1, 1,2, 'photo.png'),
-- ('Advanced Task Automation with npm Scripts','Enhance Your Development Productivity','Take your npm Scripts knowledge to the next level with this advanced course. Explore advanced automation techniques, create custom scripts, integrate npm Scripts with other tools, and optimize your development workflow further. This course is designed for developers looking to maximize their productivity and efficiency in managing complex projects.', 55, 5 ,'Active', 1, 3,3, 'photo.png');
-- for build tools\Linters formatters\Prettier
-- ('Linters and Formatters with Prettier','Streamlining Code Quality and Formatting','Learn how to enhance code quality and consistency by leveraging Prettier along with popular linters. This course covers the fundamentals of linting and code formatting, introduces you to Prettier s features, and demonstrates how to integrate it into your development workflow. By the end of this course, you will be able to write clean, well-formatted code with ease.', 45, 5 ,'Active', 1, 1,2, 'photo.png'),
-- ('Advanced Code Formatting with Prettier','Mastering Code Consistency and Readability','Take your code formatting skills to the next level with this advanced course. Explore advanced Prettier configuration, customize formatting rules, integrate Prettier with various IDEs, and enforce code consistency in large projects. This course is designed for developers who want to become experts in code formatting and maintainability.', 55, 5 ,'Active', 1, 3,3, 'photo.png');
-- for build tools\Linters formatters\ESLint
-- ('ESLint for Front-End Developers','Code Quality in Web Development','Dive into ESLint and its role in front-end web development. This course focuses on ESLint s application in HTML, CSS, and JavaScript projects, helping front-end developers maintain code consistency, readability, and error-free code. By the end of this course, you will be equipped to create high-quality web applications with ESLint.', 45, 5 ,'Active', 1, 1,1, 'photo.png'),


-- ('Effective Code Quality with ESLint','Mastering Code Analysis and Formatting','Learn how to enhance code quality and maintainability by using ESLint, a popular JavaScript linter. This course covers the essentials of ESLint configuration, rule customization, and integrating ESLint into your development workflow. By the end of this course, you will be able to write clean and error-free JavaScript code.', 35, 5 ,'Active', 1, 2,2, 'photo.png'),
-- ('Advanced ESLint Configuration and Best Practices','Customizing ESLint for Complex Projects','Take your ESLint skills to the next level with this advanced course. Explore advanced ESLint configuration, rule sets, and best practices for maintaining code quality in large and complex JavaScript projects. This course is designed for developers who want to become experts in code analysis and formatting using ESLint.', 35, 5 ,'Active', 1, 3,3, 'photo.png');


INSERT INTO Enrollment (strting_date, progress_state, ending_date, student_id, course_id)
VALUES
-- For Student 6
-- ('2023-09-15', 3, NULL, 6, 12);
-- F
-- ('2023-09-10', 7, '2023-09-15', 6, 13);
-- For Student 8 F
-- ('2023-09-15', 6, '2023-09-15', 8, 14);
--

INSERT INTO Items (item_title, item_description, item_no, course_id, topic_id,item_type)
VALUES
--! for first COURSE this item = 1 (1 , 2 ,3) = 3
-- ('test', 'video covers the basics of HTML', 1, 36,72,2)
-- ('Article intro to html basics', 'Article covers the basics of HTML', 2, 12,35,1),
--('quiz intro to html basics', 'quiz covers the basics of HTML', 3, 12,35,3);




--! for first COURSE this item = 2(1 , 2 ,3) = 6
-- ('video to html basics', 'video covers the basics of HTML', 1, 12,35,2),
-- ('Article to html basics', 'Article covers the basics of HTML', 2, 12,35,1),
-- ('quiz to html basics', 'quiz covers the basics of HTML', 3, 12,35,3);




--! for scound COURSE this item = 1(1 ,2 ,3 ) = 3
-- ('video intro to Essentials', 'video covers Essentials', 1, 13,35,2),
-- ('Article intro to Essentials', 'Article covers Essentials', 2, 13,35,1),
-- ('quiz intro to Essentials', 'quiz covers Essentials', 3, 13,35,3);



-- for scound COURSE this item = 2(1 ,2 ,3) = 6
-- ('video to Essentials', 'video covers Essentials', 1, 13,35,2),
-- ('Article to Essentials', 'Article covers Essentials', 2, 13,35,1),
-- ('quiz to Essentials', 'quiz covers Essentials', 3, 13,35,3);




-- -- for scound COURSE this item = 3(1) = 7
-- ('more Article about Essentials', 'Article covers Essentials', 1, 13,35,1),;

-- -- for third COURSE this item = 1 (1 ,2 ,3) = 3
-- ('video intro to HTML Advanced Techniques', 'video covers HTML Advanced Techniques', 1, 14,35,2),
-- ('Article intro to HTML Advanced Techniques', 'Article covers HTML Advanced Techniques', 2, 14,35,1),
-- ('quiz intro to HTML Advanced Techniques', 'quiz covers HTML Advanced Techniques', 3, 14,35,3);
-- -- for third COURSE this item = 2 (1 ,2 ,3) = 6
-- ('video to HTML Advanced Techniques', 'video covers HTML Advanced Techniques', 1, 14,35,2),
-- ('Article to HTML Advanced Techniques', 'Article covers HTML Advanced Techniques', 2, 14,35,1),
-- ('quiz to HTML Advanced Techniques', 'quiz covers HTML Advanced Techniques', 3, 14,35,3);


INSERT INTO Option (option_body, is_correct, option_no, question_id)
VALUES
('HTML stands for HyperText Markup Language.', TRUE, 1, 17),
('HTML stands for High-Level Text Markup Language.', FALSE, 2, 17),

('HTML is used to structure and present content on the internet by defining the structure of web pages using markup.', TRUE, 1, 18),
('HTML is used to create interactive and dynamic elements on the web by integrating programming logic and functionalities directly into web pages.', FALSE, 2, 18),

('HTML tags are used to define the structure and elements of a web page, organizing content into headings, paragraphs, lists, images, links, and other essential components', TRUE, 1, 19),
('HTML tags are used primarily for styling and design, allowing developers to apply various visual effects, layouts, and colors to the web page.', FALSE, 2, 19),

('HTML elements are the building blocks of a web page s structure and content. They define the type of content, such as headings, paragraphs, images, and links.', TRUE, 1, 20),
('HTML elements and HTML attributes are essentially the same, and the terms are interchangeable.', FALSE, 2, 20),

('HTML tags are used to define the structure and elements of a web page. They enclose content and provide the browser with information on how to present and interpret that content.', TRUE, 1, 21),
('HTML tags are only used for styling purposes, allowing developers to apply formatting, colors, and layouts to the web page.', FALSE, 2, 21),

('HTML5 is the fifth and latest version of the HyperText Markup Language.', TRUE, 1, 22),
('HTML5 is a version of HTML that focuses primarily on improving the styling and design capabilities of web pages.', FALSE, 2, 22),

('Responsive web design in HTML is an approach that allows a website to adapt and display optimally on various devices and screen sizes.', TRUE, 1, 23),
('Responsive web design in HTML refers to designing websites with fixed layouts that do not change regardless of the device or screen size.', FALSE, 2, 23),



INSERT INTO Topic_Level_N (topic_title, topic_description, topic_status, topic_level, top_level_topic_id, topic_level1_id,topic_order)
VALUES
('test', 'NativeScript is an open source framework for creating native iOS and Android apps in Angular, TypeScript, or JavaScript.', 'Stable',1,Null, 17,4);
    ('How dose the internet work', 'The Internet is a global network of computers connected to each other which communicate through a standardized set of protocols.', 'Stable',2,Null, 2,1),
    ('What is HTTP', 'HTTP is the TCP/IP based application layer communication protocol which standardizes how the client and server communicate with each other. HTTP follows a classical “Client-Server model” with a client opening a connection request, then waiting until it receives a response. HTTP is a stateless protocol, that means that the server does not keep any data (state) between two requests.', 'Stable',2,Null, 2,2),
    ('Domain Name', 'A domain name is a unique, easy-to-remember address used to access websites, such as google.com, and facebook.com. Users can connect to websites using domain names thanks to the Domain Name System (DNS).', 'Stable',2,Null, 2,3),
    ('Hosting', 'Web hosting is an online service that allows you to publish your website files onto the internet. So, anyone who has access to the internet has access to your website.', 'Stable',2,Null, 2,4),
    ('DNS', 'The Domain Name System (DNS) is the phonebook of the Internet. Humans access information online through domain names, like nytimes.com or espn.com. Web browsers interact through Internet Protocol (IP) addresses. DNS translates domain names to IP addresses so browsers can load Internet resources.', 'Stable',2,Null, 2,5),
    ('Browsers', 'A web browser is a software application that enables a user to access and display web pages or other online content through its graphical user interface.', 'Stable',2,Null, 2,6),

    ('HTML Basics', 'HTML stands for HyperText Markup Language. It is used on the frontend and gives the structure to the webpage which you can style using CSS and make interactive using JavaScript.', 'Trending',2,Null, 5,1),
    ('Semantic HTML', 'Semantic element clearly describes its meaning to both the browser and the developer. In HTML, semantic element are the type of elements that can be used to define different parts of a web page such as <form>, <table>, <article>, <header>, <footer>', 'Stable',2,Null, 5,2),
    ('Forms and Validations', 'Before submitting data to the server, it is important to ensure all required form controls are filled out, in the correct format. This is called client-side form validation, and helps ensure data submitted matches the requirements set forth in the various form controls.', 'Stable',2,Null, 5,3),
    ('Accessibility', 'Web accessibility means that websites, tools, and technologies are designed and developed in such a way that people with disabilities can use them easily.', 'Stable',2,Null, 5,4),
    ('Basics of SEO', 'SEO or Search Engine Optimization is the technique used to optimize your website for better rankings on search engines such as Google, Bing etc.', 'Cutting Edge',2,Null, 5,5)

    ('CSS Basics', 'CSS or Cascading Style Sheets is the language used to style the frontend of any website. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.', 'Trending',2,Null, 6,1),
    ('Making layouts', 'Float, grid, flexbox, positioning, display and box model are some of the key topics that are used for making layouts .', 'Stable',2,Null, 6,2),
    ('Responsive Web Design', 'Responsive Web Designing is the technique to make your webpages look good on all screen sizes. There are certain techniques used to achieve that e.g. CSS media queries, percentage widths, min or max widths heights etc.', 'Stable',2,Null, 6,3),


        ('JavaScript', 'JavaScript allows you to add interactivity to your pages. Common examples that you may have seen on the websites are sliders, click interactions, popups and so on.', 'Stable',2,Null, 7,1),
    ('DOM Manipulation', 'The Document Object Model (DOM) is a programming interface built for HTML and XML documents. It represents the page that allows programs and scripts to dynamically update the document structure, content, and style. With DOM, we can easily access and manipulate tags, IDs, classes, attributes, etc.', 'Stable',2,Null, 7,2),
    ('Fetch API', 'Ajax is the technique that lets us send and receive the data asynchronously from the servers e.g. updating the user profile or asynchronously fetching the list of searched products without reloading the page.', 'Cutting Edge',2,Null, 7,3),
    
    ('Git', 'Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.', 'Stable',2,Null, 10,1),

    ('npm', 'npm is a package manager for the JavaScript programming language maintained by npm, Inc. npm is the default package manager for the JavaScript runtime environment Node.js.', 'Stable',2,Null, 12,1),
    ('pnpm', 'PNPM is an alternative package manager for Node. js which stands for “Performant NPM”. The main purpose of PNPM is to hold all the packages at a global (centralized) store and use them if needed by other projects too by creating hard links to it.', 'Stable',2,Null, 12,2),
    ('Yarn', 'Yarn is a software packaging system developed in 2016 by Facebook for Node.js JavaScript runtime environment that provides speed, consistency, stability, and security as an alternative to npm (package manager).', 'Stable',2,Null, 12,3),

    ('React', 'React is the most popular front-end JavaScript library for building user interfaces. React can also render on the server using Node and power mobile apps using React Native.', 'Trending',2,Null, 13,1),
    ('Vue.js', 'Vue.js is an open-source JavaScript framework for building user interfaces and single-page applications. It is mainly focused on front end development.', 'Stable',2,Null, 13,2),
    ('Angular', 'Angular is a component based front-end development framework built on TypeScript which includes a collection of well-integrated libraries that include features like routing, forms management, client-server communication, and more.', 'Stable',2,Null, 13,3),
    ('Svelte', 'Svelte is a javascript framework that unlike Vue and React does not use vertical DOM diffing but instead knows exactly what and where to update when the state changes. It iss mainly focused on frontend and building user interfaces.', 'Stable',2,Null, 13,4),
    ('SolidJS', 'Solid is a reactive JavaScript toolkit for building user interfaces without a virtual DOM. To ensure that only the relevant code is executed when a state update occurs, it compiles templates down to real DOM nodes once and wraps modifications into fine-grained reactions.', 'Stable',2,Null, 13,5),
    ('Qwik', 'Qwik is a new kind of web framework that can deliver instant loading web applications at any size or complexity. Your sites and apps can boot with about 1kb of JS (regardless of application complexity), and achieve consistent performance at scale.', 'Stable',2,Null, 13,6),

    ('BEM', 'The Block, Element, Modifier methodology (commonly referred to as BEM) is a popular naming convention for classes in HTML and CSS. Developed by the team at Yandex, its goal is to help developers better understand the relationship between the HTML and CSS in a given project.', 'Cutting Edge',2,Null, 14,1),

    ('Module Bundlers', 'A module bundler is a tool that takes pieces of JavaScript and their dependencies and bundles them into a single file, usually for use in the browser. You may have used tools such as Browserify, Webpack, Rollup or one of many others.It usually starts with an entry file, and from there it bundles up all of the code needed for that entry file.', 'Stable',2,Null, 15,1),
    ('Task Runners', 'Task Runner are tools to simplify certain tedious tasks of development, like automating sass/scss compilation, bundling assets, linting source code, and hot reloading local server.', 'Stable',2,Null, 15,2),
    ('Linters formatters', 'A linter is a tool used to analyze code and discover bugs, syntax errors, stylistic inconsistencies, and suspicious constructs. Popular linters for JavaScript include ESLint, JSLint, and JSHint.', 'Stable',2,Null, 15,3),

    ('Vite', 'Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects.', 'Stable',3,57, NULL,1),
    ('esbuild', 'Our current build tools for the web are 10-100x slower than they could be. The main goal of the esbuild bundler project is to bring about a new era of build tool performance, and create an easy-to-use modern bundler along the way.', 'Stable',3,57, NULL,2),
    ('Webpack', 'Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.', 'Stable',3,57, NULL,3),
    ('Rollup', 'Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application.', 'Stable',3,57, NULL,4),
    ('Parcel', 'Parcel is a web application bundler, differentiated by its developer experience. It offers blazing-fast performance utilizing multicore processing and requires zero configuration.', 'Cutting Edge',3,57, NULL,5),

    ('npm Scripts', 'npm scripts are the entries in the scripts field of the package.json file. The scripts field holds an object where you can specify various commands and scripts that you want to expose.', 'Stable',3,58, NULL,1),


    ('Prettier', 'Prettier is an opinionated code formatter with support for JavaScript, HTML, CSS, YAML, Markdown, GraphQL Schemas. By far the biggest reason for adopting Prettier is to stop all the on-going debates over styles.', 'Stable',3,59, NULL,1),
    ('ESLint', 'With ESLint you can impose the coding standard using a certain set of standalone rules.', 'Trending',3,59, NULL,2),
    ('React Native', 'React Native is a popular JavaScript-based mobile app framework that allows you to build natively-rendered mobile apps for iOS and Android. The framework lets you create an application for various platforms by using the same codebase.', 'Cutting Edge',2,Null, 16,1),
    ('Flutter', 'Flutter is a free and open-source mobile UI framework created by Google and released in May 2017. In a few words, it allows you to create a native mobile application with only one codebase. This means that you can use one programming language and one codebase to create two different apps (for iOS and Android).', 'Trending',2,Null, 16,2),
    ('Ionic', 'Ionic framework is an open-source UI toolkit for building performant, high-quality mobile apps, desktop apps, and progressive web apps using web technologies such as HTML, CSS, and JavaScript.', 'Stable',2,Null, 16,3),
    ('NativeScript', 'NativeScript is an open source framework for creating native iOS and Android apps in Angular, TypeScript, or JavaScript.', 'Stable',2,Null, 16,4);
    

    ('Conditional Statements', 'Exploring if-else statements and switch cases', 'Active', 2, 19, 1),
    ('Linked Lists', 'Understanding linked list data structure', 'Active', 3, 20, 2), 
    ('Arrays and Matrices', 'Exploring arrays and matrix data structures', 'Active', 4, 21, 2), 
    ('HTML Basics', 'Introduction to HTML markup', 'Active', 5, 22, 3), 
    ('CSS Styling', 'Styling web pages using CSS', 'Active', 6, 23, 3),
    ('Java script', 'Styling web pages using CSS', 'Active', 7, 24, 4);
    -------
    --api roadmap by id
    --api topic_1=> topic_N
    --api topic_N=>topic_N
    UPDATE Progress_Status
SET topic_level =1 WHERE progress_id=6;
    UPDATE Progress_Status
SET topic_level =1 WHERE progress_id=7;
    UPDATE Progress_Status
SET topic_level =2 WHERE progress_id=8;
    UPDATE Progress_Status
SET topic_id =21 WHERE progress_id=8;
---
DELETE FROM Progress_Status;

INSERT INTO Progress_Status ( topic_id, topic_level,student_id,state_id)
VALUES
    ( 29, 2,5,1),
    ( 30, 2,6,2),
    ( 31, 2,7,3),
    ( 32, 2,8,1),
    ( 33, 2,5,2),
    ( 60, 3,5,2),
    ( 2,1,8,1),
    ( 5,1,5,2),
    ( 6,1,6,3),
    ( 7,1,7,2);

UPDATE Topic_States
SET state_name ='Skip' WHERE state_id=1;
-- إضافة عمود role_id إلى جدول student
ALTER TABLE student
ADD COLUMN role_id INT;

-- إضافة مفتاح خارجي للعمود role_id يشير إلى مفتاح الجدول role
ALTER TABLE student
ADD CONSTRAINT fk_student_role FOREIGN KEY (role_id) REFERENCES role(role_id);

INSERT INTO Permission (permission_name)
VALUES ('dashboard_access'),
 ('update_stting'),
 ('show_roadmap'),
 ('show_course'),
 ('show_video'),
 ('show_article'),
 ('show_quiz');

 INSERT INTO Role_Permission (role_id,permission_id)
VALUES (2,1),
(2,2),
(2,3),
(2,4),
(2,5),
(2,6),
(2,7);

UPDATE student
SET role_id =2 WHERE student_id=9; 
UPDATE student
SET role_id =2 WHERE student_id=10; 
UPDATE student
SET role_id =2 WHERE student_id=11; 
UPDATE student
SET role_id =2 WHERE student_id=12; 

-- تصحيح popular roadmap
SELECT Roadmap.roadmap_id, Roadmap.roadmap_title, Roadmap.roadmap_description, Roadmap.image_path,
       COUNT(Enrollment.enrollment_id) AS enrollment_count
FROM Roadmap
JOIN Topic_Level_1 ON Roadmap.roadmap_id = Topic_Level_1.roadmap_id
JOIN Topic_Level_N ON Topic_Level_1.topic_level1_id = Topic_Level_N.topic_level1_id
JOIN Items ON Topic_Level_N.topic_id = Items.topic_id
JOIN Course ON Items.course_id = Course.course_id
JOIN Enrollment ON Course.course_id = Enrollment.course_id
GROUP BY Roadmap.roadmap_id, Roadmap.roadmap_title, Roadmap.roadmap_description, Roadmap.image_path
ORDER BY enrollment_count DESC
LIMIT 3;

--

-- search update:
WITH RankedCourses AS (
)
, TotalCourseCount AS (
    SELECT COUNT(DISTINCT course_id) AS total_courses
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
    TLN.topic_title,
    (SELECT total_courses FROM TotalCourseCount) AS total_courses
FROM (
    SELECT
        roadmap_id,
        course_id,
        course_rank
    FROM RankedCourses
    WHERE course_rank <= 4
) RC
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
    rt.rating_stars IS NOT NULL 
ORDER BY
    RC.roadmap_id,
    RC.course_rank;
    
 roadmap_id | roadmap_title | course_id |       course_title        |                                           course_description                                           | course_duration | level_name | first_name | last_name |    rating_stars    |     type_name     | item_no | topic_title | total_courses
------------+---------------+-----------+---------------------------+--------------------------------------------------------------------------------------------------------+-----------------+------------+------------+-----------+--------------------+-------------------+---------+-------------+---------------
         18 | frontend      |        12 | HTML Basics for Beginners | This course covers the basics of HTML, including tags, elements, and structure. Perfect for beginners. |              45 | Beginner   | Ahmed      | Hassan    | 5.0000000000000000 | beginner|advanced |       1 | HTML Basics |            19

DELETE FROM Progress_Status WHERE topic_id = 5 AND student_id = 9;

--true or false
SELECT EXISTS (
        SELECT 1 FROM Progress_Status WHERE topic_id= AND student_id= AND topic_level=)



---
UPDATE Progress_Status
SET topic_id = 7, topic_level = 1, student_id = 12, state_id = 2
WHERE topic_id = 7 AND topic_level = 1 AND student_id = 12;

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
    COUNT(CASE WHEN items.item_type = 1 THEN 1 END) AS article_count,
    COUNT(CASE WHEN items.item_type = 2 THEN 1 END) AS video_count,
    COUNT(CASE WHEN items.item_type = 3 THEN 1 END) AS quiz_count,
    course.course_description,
    COALESCE(IS_ENROLLED.is_enrolled, 0) AS is_enrolled

FROM
    course
JOIN
    Levels ON course.course_level = Levels.level_id
JOIN
    Users ON course.instructor_id = Users.user_id
JOIN
    items ON course.course_id = items.course_id
LEFT JOIN
    Enrollment ON course.course_id = Enrollment.course_id
LEFT JOIN
    Rating ON Enrollment.enrollment_id = Rating.enrollment_id

-- Subquery to check if the student is enrolled in the course
LEFT JOIN (
    SELECT
        course_id,
        -- * 1 mean he has enroll 
        -- * 0 mean he hasn't enroll 
        MAX(CASE WHEN student_id = 9 THEN 1 ELSE 0 END) AS is_enrolled
    FROM
        Enrollment
    GROUP BY
        course_id
) AS IS_ENROLLED ON course.course_id = IS_ENROLLED.course_id

WHERE
    course.course_id = 12

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
    IS_ENROLLED.is_enrolled;




-- separated To 2 query
select 
    List_Type.type_name, 
    Course_Lists.item_body,
    Course_Lists.item_order
from course
    join Course_Lists on Course.course_id = Course_Lists.course_id  
    join List_Type on Course_Lists.list_type= List_Type.type_id
where course.course_id =12 ;


-- for review
select 
    Rating.rating_id,
    Student.first_name,
    Student.last_name,
    Student.picture,
    Rating.stars_number,
    Rating.review

from course
left join Enrollment on  Course.course_id = Enrollment.course_id
join Student ON Enrollment.course_id = Student.student_id
join Rating on enrollment.enrollment_id = Rating.enrollment_id
where  course.course_id = 12;

-- ! Topci_content
-- WITH combined_topics AS (
--   SELECT DISTINCT c.course_title, i.item_title, tl0.topic_title, tl1.topic_title AS topic_1_title
--   FROM course AS c
--   JOIN items AS i ON c.course_id = i.course_id
--   JOIN topic_level_n AS tl0 ON i.topic_id = tl0.topic_id
--   LEFT JOIN topic_level_n AS tl1 ON tl0.topic_id = tl1.top_level_topic_id
--   WHERE tl0.top_level_topic_id = 0
--     AND c.course_id = 12

--   UNION ALL

--   SELECT DISTINCT NULL AS course_title, NULL AS item_title, NULL AS topic_title, tl1.topic_title AS topic_1_title
--   FROM topic_level_n AS tl0
--   JOIN topic_level_1 AS tl1 ON tl0.topic_level1_id = tl1.topic_level1_id
--   WHERE tl0.topic_id = 35
--     AND tl0.topic_level = 2
--     AND tl1.topic_level1_id = 5
-- )
-- SELECT course_title, item_title, topic_title, topic_1_title
-- FROM combined_topics;   


select 
 Topic_Level_1.topic_level1_id,
 Topic_Level_1.topic_title,
 Topic_Level_n.topic_id,
 Topic_Level_n.topic_title,
 Items.item_id,
 Items.item_title,
 Items.item_no,
 Items_Types.type_name

FROM  course 
JOIN items ON course.course_id= items.course_id
JOIN Items_Types ON Items.item_type= Items_Types.type_id
join Topic_Level_N ON items.topic_id= Topic_Level_N.topic_id
join Topic_Level_1 ON Topic_Level_N.topic_level1_id= Topic_Level_1.topic_level1_id

WHERE course.course_id = 13;
-- video 
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
WHERE course.course_id = 12;
-- is_completed
SELECT 
    Topic_Level_1.topic_level1_id,
    Topic_Level_1.topic_title AS topicTitle1,
    Topic_Level_n.topic_id,
    Topic_Level_n.topic_title AS topicTitlen,
    Items.item_id,
    Items.item_title,
    Items.item_no,
    Items_Types.type_name,
    CASE 
        WHEN c.item_id IS NOT NULL THEN TRUE 
        ELSE FALSE 
    END AS is_completed,
CASE 
    WHEN EXISTS (
        SELECT 1
        FROM Enrollment e
        WHERE e.student_id = 10 AND e.course_id = 12
    ) THEN TRUE
    ELSE FALSE
END AS is_enroll
FROM course 
JOIN items ON course.course_id = items.course_id
JOIN Items_Types ON Items.item_type = Items_Types.type_id
LEFT JOIN Completed_Items ON Items.item_id = Completed_Items.item_id
JOIN Topic_Level_N ON items.topic_id = Topic_Level_N.topic_id
JOIN Topic_Level_1 ON Topic_Level_N.topic_level1_id = Topic_Level_1.topic_level1_id
LEFT JOIN (
    SELECT 
        item_id,
        enrollment_id
    FROM Completed_Items
    WHERE enrollment_id = 16
) c ON Items.item_id = c.item_id
WHERE course.course_id = 12;
--
 SELECT EXISTS(
    SELECT 1
       FROM
       Enrollment e
       WHERE student_id=9 AND course_id=12

 )
--video path
SELECT 
v.video_path
FROM video v
WHERE item_id=26;
--is_enroll
SELECT 
--course
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
    COUNT(CASE WHEN items.item_type = 1 THEN 1 END) AS article_count,
    COUNT(CASE WHEN items.item_type = 2 THEN 1 END) AS video_count,
    COUNT(CASE WHEN items.item_type = 3 THEN 1 END) AS quiz_count,
    course.course_description

FROM
    course
JOIN
    Levels ON course.course_level = Levels.level_id
JOIN
    Users ON course.instructor_id = Users.user_id
JOIN
    items ON course.course_id = items.course_id
LEFT JOIN
    Enrollment ON course.course_id = Enrollment.course_id
LEFT JOIN
    Rating ON Enrollment.enrollment_id = Rating.enrollment_id

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
    course.course_description;


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
  item_counts.article_count,  -- Include these columns in the GROUP BY clause
  item_counts.video_count,    -- Include these columns in the GROUP BY clause
  item_counts.quiz_count ,     -- Include these columns in the GROUP BY clause
  course.course_description,
  COALESCE(IS_ENROLLED.is_enrolled, 0) AS is_enrolled
FROM
  course
  JOIN Levels ON course.course_level = Levels.level_id
  JOIN Users ON course.instructor_id = Users.user_id
  LEFT JOIN Enrollment ON course.course_id = Enrollment.course_id
  LEFT JOIN Rating ON Enrollment.enrollment_id = Rating.enrollment_id
  LEFT JOIN (
    SELECT course_id,
           COUNT(CASE WHEN item_type = 1 THEN 1 END) AS article_count,
           COUNT(CASE WHEN item_type = 2 THEN 1 END) AS video_count,
           COUNT(CASE WHEN item_type = 3 THEN 1 END) AS quiz_count
    FROM items
    GROUP BY course_id
  ) AS item_counts ON course.course_id = item_counts.course_id
  LEFT JOIN (
    SELECT course_id,
           MAX(CASE WHEN student_id = 9 THEN 1 ELSE 0 END) AS is_enrolled
    FROM Enrollment
    GROUP BY course_id
  ) AS IS_ENROLLED ON course.course_id = IS_ENROLLED.course_id
WHERE
  course.course_id = 12
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
  item_counts.article_count,  -- Include these columns in the GROUP BY clause
  item_counts.video_count,    -- Include these columns in the GROUP BY clause
  item_counts.quiz_count;  
    --
  --instructorDashboard
    --1 total enrollments لكورس محدد
    SELECT COUNT(DISTINCT Course.course_id) AS total_enrollments
        FROM Course
        JOIN Enrollment ON Course.course_id = Enrollment.course_id
        WHERE Enrollment.course_id = 16;
    -- لكل الكورسات هذا الصحيح
    SELECT SUM(total_enrollments) AS total
        FROM (
        SELECT Course.course_id, COUNT(Enrollment.course_id) AS total_enrollments
        FROM Course
        LEFT JOIN Enrollment ON Course.course_id = Enrollment.course_id
        WHERE Course.instructor_id = 1
        GROUP BY Course.course_id
        ) subquery
        WHERE total_enrollments > 0;


    --2 total reviews لكورس محدد
        SELECT COUNT(DISTINCT r.rating_id) AS total_reviews
        FROM Rating r
        JOIN Enrollment ON r.enrollment_id = Enrollment.enrollment_id
        WHERE Enrollment.course_id = 12;
        --لكل الكورسات
           SELECT SUM(total_reviews) AS total
            FROM (
            SELECT Course.course_id, COUNT(rating.rating_id) AS total_reviews
            FROM Course
            LEFT JOIN Enrollment e ON Course.course_id = e.course_id
            LEFT JOIN rating ON e.enrollment_id = rating.enrollment_id
            WHERE Course.instructor_id = 1
            GROUP BY Course.course_id
            ) subquery
            WHERE total_reviews > 0;
    --3 total courses
       SELECT SUM(total_courses) AS total
            FROM (
            SELECT  COUNT(Course.course_id) AS total_courses
            FROM Course
            WHERE Course.instructor_id = 1
            GROUP BY Course.course_id
            ) subquery
            WHERE total_courses > 0;
    --4 total students **
             SELECT  COUNT( DISTINCT Enrollment.student_id) AS total_student
        FROM Course
        LEFT JOIN Enrollment ON Course.course_id = Enrollment.course_id
        WHERE Course.instructor_id = 1;
    -- my topics
     INSERT INTO Assigning_Topics (instructor_id,topic_level1_id)
     VALUES (1,2);
     -- query
     SELECT Assigning_Topics.topic_level1_id,Topic_Level_1.topic_title,Topic_Level_1.roadmap_id,Topic_Level_1.topic_level1_id
        FROM Assigning_Topics 
        LEFT JOIN Topic_Level_1  ON Assigning_Topics.topic_level1_id = Topic_Level_1.topic_level1_id
        WHERE Assigning_Topics.instructor_id = 1;
    -- Ratings in average
          SELECT avg(average) AS avg
            FROM (
            SELECT avg(rating.stars_number) AS average
            FROM Course
            LEFT JOIN Enrollment e ON Course.course_id = e.course_id
            LEFT JOIN rating ON e.enrollment_id = rating.enrollment_id
            WHERE Course.instructor_id = 1
            GROUP BY Course.course_id
                  ) subquery
            WHERE average > 0;   -- Include these columns in the GROUP BY clause


SELECT
-- * When We Write Api Remember Delete instructor_name .
    Users.first_name AS instructor_name,
    COUNT(DISTINCT Enrollment.student_id) AS enrolled_students_count
FROM
    Course
JOIN
    Users ON Course.instructor_id = Users.user_id
JOIN
    Enrollment ON Course.course_id = Enrollment.course_id
    where user_id = 2
GROUP BY
    Users.first_name;
        --  rules for instructor courses
-- 1 تحديد متطلب على الاقل(course list):
-- courseList.length>1
--SELECT length('w3resource')
-- AS "Length of a String";
Length of a String
------------------
                 10
(1 row)
-- 2 تحديد هدفين على الاقل(in this course)
-- 3 who this course 

-- 4 على الاقل يكون في 3 item ويكون الهن محتوى:
-- لازم يكوون لكل كورس أقل شي 3 tem مرتبطين فيه

-- 5 لازم يكون في وصف 
-- 6 لازم يكون في subtitle 
-- 7 تحديد نوع الكورس 
-- 8 تحديد مستوى الكورس
-- 9 تحميل صور للكورس

            --
SELECT c.course_id, c.course_title
FROM Course c
JOIN Course_Lists cl ON c.course_id = cl.course_id
JOIN List_Type lt ON cl.list_type = lt.type_id
JOIN Items I ON c.course_id = I.course_id
JOIN Courses_Type ON c.course_type = Courses_Type.type_id
JOIN Levels ON c.course_level = Levels.level_id
LEFT JOIN Video v ON I.item_id = v.item_id
LEFT JOIN Article a ON I.item_id = a.item_id
LEFT JOIN Quiz q ON I.item_id = q.item_id
WHERE c.instructor_id = 1
GROUP BY c.course_id, c.course_title
HAVING
  COUNT(CASE WHEN lt.type_name = 'In this course you will learn the following' THEN cl.list_id END) >= 1
  AND
  COUNT(CASE WHEN lt.type_name = 'Who this course is for:' THEN cl.list_id END) >= 1
  AND
  COUNT(CASE WHEN lt.type_name = 'Requirements' THEN cl.list_id END) >= 1
  AND
  COUNT(DISTINCT I.item_id) >= 3
  AND
  (
    COUNT(DISTINCT CASE WHEN v.item_id IS NOT NULL THEN I.item_id END) >= 1
    OR
    COUNT(DISTINCT CASE WHEN a.item_id IS NOT NULL THEN I.item_id END) >= 1
    OR
    COUNT(DISTINCT CASE WHEN q.item_id IS NOT NULL THEN I.item_id END) >= 1
  );
  --my courses
SELECT c.course_id, c.course_title,c.subtitle
FROM Course c
JOIN Course_Lists cl ON c.course_id = cl.course_id
JOIN List_Type lt ON cl.list_type = lt.type_id
JOIN Items I ON c.course_id = I.course_id
JOIN Courses_Type ON c.course_type = Courses_Type.type_id
JOIN Levels ON c.course_level = Levels.level_id
LEFT JOIN Video v ON I.item_id = v.item_id
LEFT JOIN Article a ON I.item_id = a.item_id
LEFT JOIN Quiz q ON I.item_id = q.item_id
WHERE c.instructor_id = 1
AND c.subtitle IS NOT NULL
AND c.course_description IS NOT NULL
AND c.course_level IS NOT NULL
AND c.course_type IS NOT NULL
AND c.course_thumnail IS NOT NULL
GROUP BY c.course_id, c.course_title
HAVING
  COUNT(CASE WHEN lt.type_name = 'In this course you will learn the following' THEN cl.list_id END) >= 1
  AND
  COUNT(CASE WHEN lt.type_name = 'Who this course is for:' THEN cl.list_id END) >= 1
  AND
  COUNT(CASE WHEN lt.type_name = 'Requirements' THEN cl.list_id END) >= 1
  AND
  COUNT(DISTINCT I.item_id) >= 3
  AND
  (
    COUNT(DISTINCT CASE WHEN v.item_id IS NOT NULL THEN I.item_id END) >= 1
    AND
    COUNT(DISTINCT CASE WHEN a.item_id IS NOT NULL THEN I.item_id END) >= 1
    AND
    COUNT(DISTINCT CASE WHEN q.item_id IS NOT NULL THEN I.item_id END) >= 1
  );
  --- my non-completed courses
SELECT course_id, course_title,course_thumnail, progress
FROM (
  SELECT c.course_id, c.course_title,c.course_thumnail,
    CASE
      WHEN c.subtitle IS NOT NULL THEN 1 ELSE 0 END +
    CASE
      WHEN c.course_description IS NOT NULL THEN 1 ELSE 0 END +
    CASE
      WHEN c.course_level IS NOT NULL THEN 1 ELSE 0 END +
    CASE
      WHEN c.course_type IS NOT NULL THEN 1 ELSE 0 END +
    CASE
      WHEN c.course_thumnail IS NOT NULL THEN 1 ELSE 0 END +
    CASE
      WHEN COUNT(CASE WHEN lt.type_name = 'In this course you will learn the following' THEN cl.list_id END) >= 1 THEN 1 ELSE 0 END +
    CASE
      WHEN COUNT(CASE WHEN lt.type_name = 'Who this course is for:' THEN cl.list_id END) >= 1 THEN 1 ELSE 0 END +
    CASE
      WHEN COUNT(CASE WHEN lt.type_name = 'Requirements' THEN cl.list_id END) >= 1 THEN 1 ELSE 0 END +
    CASE
      WHEN COUNT(DISTINCT I.item_id) >= 3 THEN 1 ELSE 0 END +
    CASE
      WHEN (
        COUNT(DISTINCT CASE WHEN v.item_id IS NOT NULL THEN I.item_id END) >= 1
        AND COUNT(DISTINCT CASE WHEN a.item_id IS NOT NULL THEN I.item_id END) >= 1
        AND COUNT(DISTINCT CASE WHEN q.item_id IS NOT NULL THEN I.item_id END) >= 1
      ) THEN 1 ELSE 0 END AS progress
  FROM Course c
  JOIN Course_Lists cl ON c.course_id = cl.course_id
  JOIN List_Type lt ON cl.list_type = lt.type_id
  JOIN Items I ON c.course_id = I.course_id
  LEFT JOIN Video v ON I.item_id = v.item_id
  LEFT JOIN Article a ON I.item_id = a.item_id
  LEFT JOIN Quiz q ON I.item_id = q.item_id
  WHERE c.instructor_id = 1
  GROUP BY c.course_id, c.course_title
) AS subquery
WHERE progress != 10;


---
UPDATE course
SET course_thumnail =NULL WHERE course_id=12;

  --insert to course list
  INSERT INTO Course_Lists (item_body, item_order, list_type, course_id)
VALUES
  ('AI Base', 1, 3, 15),
  ('for student', 2, 2, 15), 
  ('Ai', 3, 1, 15);
--CreateCourse

INSERT INTO Course (course_title, instructor_id, course_level, course_type)
VALUES
  ('html', 1, 1, 2);

  
-- Totle item for instructor
SELECT
    SUM(course_item_counts.item_count) AS total_item_count
FROM (
    SELECT
        COUNT(items.item_id) AS item_count
    FROM
        Users
    JOIN
        Course ON Users.user_id = course.instructor_id
    JOIN
        items ON course.course_id = items.course_id
    WHERE
        Users.user_id = 1
) AS course_item_counts;


-- All review for instructor 
SELECT 
Rating.rating_id,
Student.first_name, 
Student.last_name, 
Student.picture, 
Rating.stars_number,
Rating.review 
FROM Users
LEFT JOIN course ON Users.user_id = course.instructor_id
JOIN enrollment ON course.course_id = enrollment.course_id
JOIN student ON enrollment.student_id = Student.student_id
JOIN rating ON enrollment.enrollment_id = rating.enrollment_id
where Users.user_id = 2;

-- All enrollment for instructor  
SELECT 
Student.first_name, 
Student.last_name, 
Student.picture,    
Student.country,
course.course_title  
FROM Users
LEFT JOIN course ON Users.user_id = course.instructor_id
JOIN enrollment ON course.course_id = enrollment.course_id
JOIN student ON enrollment.student_id = Student.student_id
WHERE users.user_id =1;
 --permissions
DELETE FROM Permission WHERE permission_id=8;

UPDATE Permission
SET permission_name ='dashboardAccessToStudent' WHERE permission_id=1;

UPDATE Permission
SET permission_name ='updateSttingToStudent' WHERE permission_id=2;

INSERT INTO permission (permission_name)
VALUES
  ('enrollToCourse'),
  ('addReview'),
  ('dashboardAccessToInstructor'),
  ('showCourseInfoPage'),
  ('createCourse'),
  ('updateSttingToInstructor'),
  ('showStudentProfile'),
  ('addProgressState')

 INSERT INTO Role_Permission (role_id,permission_id)
 VALUES (1,3),
  (1,4),
  (1,10),
  (1,11),
  (1,12),
  (1,13),
  (1,14),
  (2,15),
  (2,16),
  (2,9);

  ALTER TABLE users
ALTER COLUMN password TYPE character varying(150);

--edit Course page

INSERT INTO course (course_title ,course_subtitle,course_description,course_level,course_type,course_thumnail)
VALUES
  ('manager'),
  ('supervisor'),
  ('AcademicManager');

SELECT course_title , subtitle, course_level, course_type, course_description,course_thumnail FROM course WHERE course_id=12;

  UPDATE course
  SET
    title = $1,
    subtitle = $2,
    level = $3,
    type = $4,
    description = $5
  WHERE course_id =$6;
  
  SELECT item_body FROM Course_Lists WHERE course_id =12;
--    else{
--    insert date
--    const insertQuery = `
--      INSERT INTO course (course_title ,course_subtitle,course_description,course_level,course_type,course_thumnail)
--      VALUES
--      ($1),($2),($3),($4),($5),($6)
--      `;
--    const value = [title, subtitle, description, level, type, imageFilePath];
--    const result = await pool.query(insertQuery, value);
--  }

  UPDATE Course_Lists
  SET
item_body
  WHERE course_id =$1 AND list_id=$2;

INSERT INTO Course_Lists (item_body,item_order,list_type,course_id)
      VALUES
      ("hhh",1,1,12) RETURNING *;

      DELETE FROM Course_Lists WHERE list_id BETWEEN 41 AND 55;

      SELECT course_title , subtitle, ct.type_name,l.level_name, course_type, course_description,course_thumnail
       FROM course
      JOIN Courses_Type ct ON course.course_type =ct.type_id
      JOIN Levels l ON course.course_level =l.level_id

       WHERE course_id=12
       ---
               SELECT course_id, course_title,course_thumnail, progress
          FROM (
            SELECT c.course_id, c.course_title,c.course_thumnail,
            CASE
              WHEN c.subtitle IS NOT NULL THEN 1 ELSE 0 END +
            CASE
              WHEN c.course_description IS NOT NULL THEN 1 ELSE 0 END +
            CASE
              WHEN c.course_level IS NOT NULL THEN 1 ELSE 0 END +
            CASE
              WHEN c.course_type IS NOT NULL THEN 1 ELSE 0 END +
            CASE
              WHEN c.course_thumnail IS NOT NULL THEN 1 ELSE 0 END +
            CASE
              WHEN COUNT(CASE WHEN lt.type_name = 'In this course you will learn the following' THEN cl.list_id END) >= 1 THEN 1 ELSE 0 END +
            CASE
              WHEN COUNT(CASE WHEN lt.type_name = 'Who this course is for:' THEN cl.list_id END) >= 1 THEN 1 ELSE 0 END +
            CASE
              WHEN COUNT(CASE WHEN lt.type_name = 'Requirements' THEN cl.list_id END) >= 1 THEN 1 ELSE 0 END +
            CASE
              WHEN COUNT(DISTINCT I.item_id) >= 3 THEN 1 ELSE 0 END +
            CASE
              WHEN (
                COUNT(DISTINCT CASE WHEN v.item_id IS NOT NULL THEN I.item_id END) >= 1
                AND COUNT(DISTINCT CASE WHEN a.item_id IS NOT NULL THEN I.item_id END) >= 1
                AND COUNT(DISTINCT CASE WHEN q.item_id IS NOT NULL THEN I.item_id END) >= 1
              ) THEN 1 ELSE 0 END AS progress
          FROM Course c
          LEFT JOIN Course_Lists cl ON c.course_id = cl.course_id
          LEFT JOIN List_Type lt ON cl.list_type = lt.type_id
          LEFT JOIN Items I ON c.course_id = I.course_id
          LEFT JOIN Video v ON I.item_id = v.item_id
          LEFT JOIN Article a ON I.item_id = a.item_id
          LEFT JOIN Quiz q ON I.item_id = q.item_id
          WHERE c.instructor_id = 3
          GROUP BY c.course_id, c.course_title
        ) AS subquery
        WHERE progress < 10;
    






