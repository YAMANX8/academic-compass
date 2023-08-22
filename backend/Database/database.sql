-- All instructions executed on the database are written here

-- change COLUMN password character in student from 50 to 100 
ALTER TABLE student
ALTER COLUMN password TYPE character varying(100);
-- add new column to table
ALTER TABLE table_name
ADD COLUMN new_column_name data_type;
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
-- بدون 100
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






