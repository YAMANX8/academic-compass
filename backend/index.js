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

app.use("/AcademicCompass/auth", require("./Routes/Students/register/jwtAuth"));

// dashboard route to student
app.use("/AcademicCompass/studentDashboard", require("./Routes/Students/dashboardStudent/dashboard"));

// change password
app.use("/AcademicCompass/studentDashboard/change-password", require("./Routes/Students/dashboardStudent/settings/security"));

// Update Acount
app.use("/AcademicCompass/studentDashboard/update-account", require("./Routes/Students/dashboardStudent/settings/account"));

// Register routes to Lucturer
app.use("/AcademicCompass/auth", require("./Routes/lecturer/register"));

//test route to Register routes to Lucturer
app.use("/AcademicCompass/test", require("./Routes/lecturer/test"));

// get all Roadmap
app.use("/AcademicCompass/roadmap", require("./Routes/Roadmap/Roadmap"));

// add roadmap
 app.use("/AcademicCompass/addroadmap",require("./Routes/Roadmap/addRoadmap"));

//Home 
app.use("/AcademicCompass/home", require("./Routes/Students/home/home"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is up ans listening on port ${port}`);
});
