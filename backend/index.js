require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const morgan = require("morgan");
const app = express();


//midleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//ROUTES//


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is up ans listening on port ${port}`);
});