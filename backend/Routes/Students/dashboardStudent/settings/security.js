const router = require("express").Router();
const pool = require("../../../../Database/db");
const authorization = require("../../../../middleware/authorization.js");
const bcrypt = require("bcrypt");

// Change student password
router.put('/', authorization , async (req, res) => {
    const { currentPassword, newPassword, verifyNewPassword } = req.body;
    // const student_id = req.params.id;
    const student_id  =req.student.studentId;

    try {
        const query = 'SELECT password FROM student WHERE student_id = $1';
        const { rows } = await pool.query(query, [student_id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Student not found' });
        }
        // todo here we need to compare bcrypt password
        const storedPassword = rows[0].password;

        
         const validPassword = await bcrypt.compare(
           currentPassword,
           storedPassword
         );
         if (!validPassword) {
           return res.status(401).json({ message: "Invalid current password" });
         }

        if (newPassword !== verifyNewPassword) {
            return res.status(400).json({ message: 'New passwords do not match' });
        }

        //* bcrypt new password
        const saltRound = 10;
        const newSalt = await bcrypt.genSalt(saltRound);
        const newBcryptPassword = await bcrypt.hash(newPassword, newSalt);

        const updateQuery = 'UPDATE student SET password = $1 WHERE student_id = $2';
        await pool.query(updateQuery, [newBcryptPassword, student_id]);

        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
