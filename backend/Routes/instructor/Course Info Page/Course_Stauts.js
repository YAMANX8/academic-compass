const router = require("express").Router();
const pool = require("../../../Database/db");

router.get("/", async (req, res) => {
    try {
        const instructorId = 1;
        // ! First qurey
        const totle_item_query =
            `
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
            Users.user_id = $1
    ) AS course_item_counts;
    `;
        const totle_item_result = await pool.query(totle_item_query, instructorId);

        // ! Scound qurey
        const totle_enrollment_query =
            `
        SELECT SUM(total_enrollments) AS total
        FROM (
        SELECT Course.course_id, COUNT(Enrollment.course_id) AS total_enrollments
        FROM Course
        LEFT JOIN Enrollment ON Course.course_id = Enrollment.course_id
        WHERE Course.instructor_id = $1
        GROUP BY Course.course_id
        ) subquery
        WHERE total_enrollments > 0;
        `;
        const totle_enrollment_result = await pool.query(totle_enrollment_query, instructorId);

        // ! Therd query
        const totle_review_query =
            `
        SELECT SUM(total_reviews) AS total
        FROM (
        SELECT Course.course_id, COUNT(rating.rating_id) AS total_reviews
        FROM Course
        LEFT JOIN Enrollment e ON Course.course_id = e.course_id
        LEFT JOIN rating ON e.enrollment_id = rating.enrollment_id
        WHERE Course.instructor_id = $1
        GROUP BY Course.course_id
        ) subquery
        WHERE total_reviews > 0;
        `;
        const totle_review_result = await pool.query(totle_review_query, instructorId);

    } catch (err) {
        console.log(err.message);
        res.status(500).json("Sever Error");
    }
})