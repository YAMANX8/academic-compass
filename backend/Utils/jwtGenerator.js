const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function jwtGenerator(student_id, first_name, last_name,picture) {
  const payload = {
    studentId: student_id,
    studentName: first_name,
    studentLastName: last_name,
    picture:picture
  };

  const token = jwt.sign(payload, process.env.jwtSecret, {
    expiresIn: "1hr",
  });

  return { token};
}
module.exports = jwtGenerator;
