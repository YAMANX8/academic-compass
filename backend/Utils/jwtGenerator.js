const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function jwtGenerator(user_id) {
  const payload = {
    userId: user_id
  };

  const token = jwt.sign(payload, process.env.jwtSecret, {
    expiresIn: "48hr",
  });

  return { token};
}
module.exports = jwtGenerator;
