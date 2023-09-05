const db = require("../../Database/db");

const InProgresCourseInfo = async (student_id) => {
  try {
    //* the query dosen't work with ""
    const query =
      "SELECT c.course_id, c.course_title, c.subtitle,c.course_thumnail FROM course c JOIN enrollment e ON c.course_id = e.course_id WHERE e.student_id = $1 AND e.progress_state < c.items_count ORDER BY c.course_title";
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
      "SELECT e.student_id, c.course_id,ROUND(  CASE   WHEN c.items_count = e.progress_state THEN 100 ELSE (e.progress_state::float / c.items_count) * 100  END) AS completion_percentage FROM Course c LEFT JOIN Enrollment e ON c.course_id = e.course_id WHERE (e.progress_state IS NULL OR e.progress_state <= c.items_count)  AND e.student_id = $1  AND (e.progress_state != c.items_count OR e.progress_state IS NULL)";
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
     SELECT
        c.course_id,
        r.stars_number
    FROM "course" c
    JOIN "enrollment" e ON c.course_id = e.course_id
    LEFT JOIN "rating" r ON e.enrollment_id = r.enrollment_id
    WHERE
    (e.progress_state IS NULL OR e.progress_state <= c.items_count)
    AND e.student_id = $1
    AND (e.progress_state != c.items_count OR e.progress_state IS NULL)
    ORDER BY c.course_title
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
