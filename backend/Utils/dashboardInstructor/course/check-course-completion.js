const pool = require('../../../database/db');

// Check if a Course is Completed.
const checkCourseCompletion = async (courseId) => {
  try {
    const value = [courseId];

    const query = `
      SELECT
        c.course_id,
        c.course_title,
        c.subtitle,
        c.course_thumnail,
        c.course_status
      FROM
        course c
        JOIN course_lists cl ON c.course_id = cl.course_id
        JOIN list_type lt ON cl.list_type = lt.type_id
        JOIN items i ON c.course_id = i.course_id
        JOIN courses_type ct ON c.course_type = ct.type_id
        JOIN levels l ON c.course_level = l.level_id
        LEFT JOIN video v ON i.item_id = v.item_id
        LEFT JOIN article a ON i.item_id = a.item_id
        LEFT JOIN quiz q ON i.item_id = q.item_id
      WHERE
        c.course_id = $1
        AND c.subtitle IS NOT NULL
        AND c.course_title IS NOT NULL
        AND c.course_description IS NOT NULL
        AND c.course_level IS NOT NULL
        AND c.course_type IS NOT NULL
        AND c.course_thumnail IS NOT NULL
      GROUP BY
        c.course_id
      HAVING
        COUNT(
          CASE
            WHEN lt.type_name = 'In this course you will learn the following' THEN cl.list_id
          END
        ) >= 1
        AND COUNT(
          CASE
            WHEN lt.type_name = 'Who this course is for:' THEN cl.list_id
          END
        ) >= 1
        AND COUNT(
          CASE
            WHEN lt.type_name = 'Requirements' THEN cl.list_id
          END
        ) >= 1
        AND COUNT(DISTINCT i.item_id) >= 3
        AND (
          COUNT(
            DISTINCT CASE
              WHEN v.item_id IS NOT NULL THEN i.item_id
            END
          ) >= 1
          AND COUNT(
            DISTINCT CASE
              WHEN a.item_id IS NOT NULL THEN i.item_id
            END
          ) >= 1
          AND COUNT(
            DISTINCT CASE
              WHEN q.item_id IS NOT NULL THEN i.item_id
            END
          ) >= 1
        );
    `;

    const result = await pool.query(query, value);
    const isCompleted = result.rows.length > 0;
    if (isCompleted) {
        return true;
    }
    else{
        return false;
    }
  } catch (err) {
    console.error('Error: ', err);
    return {
      status: 'error',
      message: 'Failed to check course completion',
    };
  }
};

module.exports = {
  checkCourseCompletion,
};
