const pool = require('../../database/db');
const sql = require('pg-promise')();

const GetCompletedCourse = async (student_id) => {
  try {
    const query = sql.postgresql`
      SELECT
        c.course_id,
        c.course_title,
        c.subtitle
      FROM
        course c
        JOIN enrollment e ON c.course_id = e.course_id
      WHERE
        e.student_id = $1
        AND e.progress_state >= c.items_count
      ORDER BY
        c.course_title
    `;
    const values = [student_id];
    const result = await pool.query(query, values);
    return {
      status: 'success',
      results: result.rows.length,
      Data: {
        data: result.rows,
      },
    };
  } catch (error) {
    console.error('Error Get Completed Course : ', error);
    return {
      status: 'error',
      message: 'Error Get Completed Course Is Field',
    };
  }
};

module.exports = {
  GetCompletedCourse,
};
