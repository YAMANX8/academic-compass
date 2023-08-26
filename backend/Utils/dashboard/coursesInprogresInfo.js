const db = require("../../Database/db");

const InProgresCourseInfo = async (student_id) => {
  try {
    //* the query dosen't work with ""
    const query =
      "SELECT c.course_id, c.course_title, c.course_description FROM course c JOIN enrollment e ON c.course_id = e.course_id LEFT JOIN items i ON c.course_id = i.course_id WHERE e.student_id = $1 AND e.progress_state >= i.item_no ORDER BY c.course_title";
    const values = [student_id];
    const result = await db.query(query, values);
    return {
      status: "success",
      results: result.rows.length,
      Data: {
        data: result.rows,
      },
    };
  } catch (error) {
    console.error("Error Get InProgres Course Info:", error);
    return {
      status: "error",
      message: "Get In Progres Course Info is Filed",
    };
  }
};
const completionPercentage = async (student_id) => {
  try {
    const query =
      "SELECT e.student_id, c.course_id, ROUND(CASE WHEN i.item_no = e.progress_state THEN 100 ELSE (e.progress_state::float / i.item_no) * 100 END) AS completion_percentage FROM course c JOIN items i ON c.course_id = i.course_id LEFT JOIN enrollment e ON c.course_id = e.course_id WHERE (e.progress_state IS NULL OR e.progress_state <= i.item_no) AND e.student_id = $1 AND (e.progress_state != i.item_no OR e.progress_state IS NULL)";
    const values = [student_id];
    const result = await db.query(query, values);
    return {
      status: "success",
      results: result.rows.length,
      Data: {
        data: result.rows,
      },
    };
  } catch (error) {
    console.error("Error Get TotalPoint", error);
    return {
      status: "error",
      message: "Get Total Point is Filed",
    };
  }
};
const starsNumber = async (student_id) => {
  try {
    const query = `
      WITH IncompleteCourses AS (
        SELECT c.course_id, c.course_title
        FROM course c
        JOIN enrollment e ON c.course_id = e.course_id
        LEFT JOIN items i ON c.course_id = i.course_id
        WHERE e.student_id = $1 AND e.progress_state < i.item_no
      )
      SELECT
        ic.course_id,
        ic.course_title,
        AVG(r.stars_number) AS average_rating
      FROM IncompleteCourses ic
      LEFT JOIN enrollment e ON ic.course_id = e.course_id
      LEFT JOIN rating r ON e.enrollment_id = r.enrollment_id
      GROUP BY ic.course_id, ic.course_title
      ORDER BY ic.course_title;
    `;
    const values = [student_id];
    const result = await db.query(query, values);
    return {
      status: "success",
      results: result.rows.length,
      Data: {
        data: result.rows,
      },
    };
  } catch (error) {
    console.error("Error Get TotalPoint", error);
    return {
      status: "error",
      message: "Get Total Point is Filed",
    };
  }
};

module.exports = {
  InProgresCourseInfo,
  completionPercentage,
  starsNumber,
};
