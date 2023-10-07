const router = require("express").Router();
const pool = require("../../../Database/db");

router.post("/", async (req, res) => {
  try {
      const { title, levelId, typeId } = req.body;
      const instructorId = 1;
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
(3 rows)`
