require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();


//midleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//ROUTES//
// Register and login routes to Student

app.use("/AcademicCompass/auth",require('./Routes/Students/jwtAuth'));

// test route
app.use("/AcademicCompass/test", require("./Routes/Students/test"));

// Register routes to Lucturer
app.use("/AcademicCompass/auth", require("./Routes/lecturer/register"));

//test route to Register routes to Lucturer

app.use("/AcademicCompass/test", require("./Routes/lecturer/test"));


// Roadmap
app.use("AcademicCompass/Roadmap")

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is up ans listening on port ${port}`);
});