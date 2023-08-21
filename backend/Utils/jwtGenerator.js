const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function jwtGenerator(student_id) {
  const payload = {
    studentId: student_id
  };

  const token = jwt.sign(payload, process.env.jwtSecret, {
    expiresIn: "1hr",
  });

  return { token};
}
module.exports = jwtGenerator;
