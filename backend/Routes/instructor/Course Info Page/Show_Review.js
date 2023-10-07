const router = require("express").Router();
const pool = require("../../../Database/db");

router.get("/", async (req, res) => {
    try {
        const instructorId = 1;
        const show_review_query =
            `
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
                where Users.user_id = $1;
                `;
        const show_review_reuslt = await pool.query(show_review_query , instructorId);
        
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Sever Error");
    }
})