require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const routes = require("./Routes/index");
const app = express();
//midleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

// Serve uploaded images
app.use("/image", express.static("Upload/Images"));
app.use("/video", express.static("Upload/video"));

// middleware for cookies
app.use(cookieParser());

//ROUTES//
app.use(routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is up ans listening on port ${port}`);
});
