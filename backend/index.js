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
// Register and login routes

app.use("/auth",require('./Routes/Students/jwtAuth'));

// dashboard route
app.use("/test",require('./Routes/Students/test'));

// Roadmap
app.use("AcademicCompass/Roadmap")

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is up ans listening on port ${port}`);
});