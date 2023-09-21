require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

//midleware
app.use(cors({origin: "http://localhost:5173",credentials:true}));
app.use(express.json());
app.use(morgan("dev"));

// Serve uploaded images
app.use("/image", express.static("Upload/Images"));

// * Update arrangement for routes
//ROUTES//

//Home 
app.use("/AcademicCompass/home", require("./Routes/Students/home/home"));

// Register and login routes to Student

app.use("/AcademicCompass/auth", require("./Routes/Students/register/jwtAuth"));

// dashboard route to student
app.use("/AcademicCompass/studentDashboard", require("./Routes/Students/dashboardStudent/dashboard"));

//setting
app.use("/AcademicCompass/student/setting", require("./Routes/Students/settings/setting"));

// get Roadmap(all&&specific map)
app.use("/AcademicCompass/roadmap", require("./Routes/Roadmap/Roadmap"));


// add roadmap
 app.use("/AcademicCompass/addroadmap",require("./Routes/Roadmap/addRoadmap"));

// addProgressState
 app.use("/AcademicCompass/roadmap/addState",require("./Routes/Roadmap/addProgressState"));

//search
app.use("/AcademicCompass/search",require("./Routes/Students/search/search"));

// Register routes to Lucturer
app.use("/AcademicCompass/auth", require("./Routes/lecturer/register"));


//test route to Register routes to Lucturer
app.use("/AcademicCompass/test", require("./Routes/lecturer/test"));





const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is up ans listening on port ${port}`);
});
