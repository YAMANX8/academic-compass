const router = require("express").Router();
const pool = require("../../../Database/db");
const checkPermission = require("../../../middleware/checkPermissions");
const authorization = require("../../../middleware/authorization");
router.post("/", authorization, async (req, res) => {
  try {
    const { title, levelId, typeId } = req.body;
    const instructorId = req.user.userId;
    const roleId = req.user.roleId;
    //permission
    const hasAccess = await checkPermission(
      instructorId,
      "createCourse",
      roleId
    );
    if (!hasAccess) {
      return res.status(403).json("Access denied");
    }
    const query = `INSERT INTO Course (course_title, instructor_id, course_level, course_type)
    VALUES ($1, $2, $3, $4) RETURNING * `;
    const value = [title, instructorId, levelId, typeId];
    const result = await pool.query(query, value);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Get course data
router.get("/", authorization, async (req, res) => {
  try {
    const instructorId = req.user.userId;
    const roleId = req.user.roleId;

    // Permission check
    const hasAccess = await checkPermission(
      instructorId,
      "createCourse",
      roleId
    );

    if (!hasAccess) {
      return res.status(403).json("Access denied");
    }

    // Get levels data
    const getLevelsQuery = `
      SELECT level_id as id, level_name as title
      FROM Levels
    `;
    const levelsResult = await pool.query(getLevelsQuery);

    // Get Courses_Type data
    const getCoursesTypeQuery = `
      SELECT type_id as id, type_name as title
      FROM Courses_Type
    `;
    const coursesTypeResult = await pool.query(getCoursesTypeQuery);

    const jsonResponse = {
      levels: levelsResult.rows,
      types: coursesTypeResult.rows,
    };

    res.status(200).json(jsonResponse);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});



module.exports = router;
// *ID
`roadmap=# SELECT * FROM Levels
 level_id |  level_name  |             level_description
----------+--------------+--------------------------------------------
        1 | Beginner     | Courses for beginners in the field.
        2 | Intermediate | Courses for learners with some experience.
        3 | Expert       | Courses for experienced learners.
(3 rows)
roadmap=# SELECT * FROM Courses_Type;
 type_id |      type_name      |                                                                              type_description
---------+---------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
       1 | project based       | A Project-Based Course is an educational program that revolves around active and practical learning.
       2 | beginner|advanced   | Beginner Course: Suitable for individuals who are new to the subject Advanced Course: Geared towards individuals who possess a solid understanding of the subject matter.
       3 | observational learn | The Observational Learning Course is designed to enhance understanding and skill acquisition by emphasizing the power of observation
(3 rows)`;
