require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const routes = require('./Routes/index');
const createUploadDirectory = require('./middleware/create-upload-directory');
const app = express();

// midleware
app.use(cors({ origin: true, credentials: true }));
// app.use(helmet()); // Disable tracking
app.use(express.json());
app.use(morgan('dev'));

// Serve uploaded images && video
app.use('/image', express.static('Upload/Images'));
app.use('/video', express.static('Upload/Videos'));
app.use('/audio', express.static('Upload/Audios'));

// middleware for cookies
app.use(cookieParser());

// Create upload directories
createUploadDirectory();

// ROUTES//
app.use(routes);

// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
