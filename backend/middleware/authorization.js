const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

module.exports = function (req, res, next) {
  try {
    const jwtToken = req.header("token");
    if (!jwtToken) {
      return res.status(403).json("Not Authoeize");
    }
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    req.student = {
      studentId: payload.studentId,
      studentName: payload.studentName,
      studentLastName: payload.studentLastName,
    };
  } catch (error) {
    console.error(error.message);
    return res.status(403).json("Not Authoeize");
  }
  next();
};
