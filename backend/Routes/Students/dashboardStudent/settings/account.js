const router = require("express").Router();
const pool = require("../../../../Database/db");
const authorization = require("../../../../middleware/authorization.js");

// Change student information
router.put('/',  authorization ,async (req, res) => {
    try {
        const { first_name, last_name, email, education, birth_date, bio } = req.body;
        // const student_id = req.params.id;
        const student_id  =req.student.student_id;
        const Get_Student = ' select * From student where student_id = $1';
        const query = `UPDATE student
        SET first_name = $1,
            last_name = $2,
            email = $3,
            education = $4,
            birth_date = $5,
            bio = $6
        WHERE student_id = $7;`;
        const updateAccount = await pool.query(query, [first_name, last_name, email, education, birth_date, bio, student_id]);
        const showmeStudnet = await pool.query(Get_Student,student_id);
        return res.status(200).json({ message: 'Acount Updated' });
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;
