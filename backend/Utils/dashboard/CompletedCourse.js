const db = require("../../Database/db");

const GetCompletedCourse = async (student_id) => {
  try {
    const query =
      "SELECT c.course_id, c.course_title, c.subtitle FROM course c JOIN enrollment e ON c.course_id = e.course_id LEFT JOIN items i ON c.course_id = i.course_id WHERE e.student_id = $1 AND e.progress_state >= i.item_no ORDER BY c.course_title";
    const values = [student_id];
    const result = await db.query(query, values);
    return {
      status: "success",
      results: result.rows.length,
      Data: {
        data: result.rows[0],
      },
    };
  } catch (error) {
    console.error("Error Get Completed Course : ", error);
    return {
      status: "error",
      message: "Error Get Completed Course Is Field",
    };
  }
};

module.exports = {
  GetCompletedCourse,
};
