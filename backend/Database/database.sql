-- All instructions executed on the database are written here

-- change COLUMN password character in student from 50 to 100 
ALTER TABLE student
ALTER COLUMN password TYPE character varying(100);

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


-- أحمد
SELECT c.course_id, c.course_title, c.course_description
FROM "course" c
JOIN "enrollment" e ON c.course_id = e.course_id
WHERE e.student_id = 2 AND e.progress_state = 'Completed'
ORDER BY c.course_title;

SELECT c.course_id, c.course_title, c.course_description
FROM "course" c
JOIN "enrollment" e ON c.course_id = e.course_id
WHERE e.student_id = 2 AND e.progress_state = 'In Progress'
ORDER BY c.course_title;


--insert data
INSERT INTO Student (first_name, last_name, email, password, education, birth_date, picture)
VALUES ('John', 'Doe', 'john@example.com', 'password123', 'Computer Science', '1995-05-10', 'profile.jpg');
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
VALUES ('2023-08-01', 5, NULL, NULL, 1, 1),
       ('2023-07-15', 10, '2023-08-15', 90, 1, 2);
--
-- إضافة بيانات تجريبية لجدول Items
INSERT INTO Items (item_title, item_description, item_no, course_id, topic_id)
VALUES ('Introduction to Loops', 'Understanding the concept of loops in programming', 6, 1, NULL),
       ('Object-Oriented Programming Concepts', 'Exploring the fundamentals of OOP', 10, 2, NULL);
--
INSERT INTO Quiz (quiz_points, item_id)
VALUES (20, 3), (30, 4);

INSERT INTO Question (question_body, question_no, question_points, quiz_id)
VALUES ('What is a loop?', 1, 10, 3), ('What is OOP?', 1, 15, 4);

INSERT INTO Option (option_body, is_correct, option_no, question_id)
VALUES ('A programming construct', TRUE, 1, 1),
       ('An animal sound', FALSE, 2, 2),
       ('Object-Oriented Programming', TRUE, 1, 1),
       ('Ocean Observation Protocol', FALSE, 2, 2);
--

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


