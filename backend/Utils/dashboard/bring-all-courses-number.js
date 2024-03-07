const pool = require('../../database/db');
const sql = require('pg-promise')();

// Bring All Courses Number For Studnet
const Get_All_Courses_Number = async (student_id) => {
  try {
    const query = sql.postgresql`
      SELECT
        COUNT(DISTINCT Course.course_id) AS total_enrollments
      FROM
        Course
        JOIN Enrollment ON Course.course_id = Enrollment.course_id
      WHERE
        Enrollment.student_id = $1;
    `;
    const values = [student_id];
    const result = await pool.query(query, values);
    return {
      status: 'success',
      results: result.rows.length,
      Data: {
        data: result.rows[0],
      },
    };
  } catch (err) {
    console.error('Error Get All Courses Number : ', err);
    return {
      status: 'error',
      message: 'Error Get All Courses Number Is Field',
    };
  }
};

module.exports = {
  Get_All_Courses_Number,
};
