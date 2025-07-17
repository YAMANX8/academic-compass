const express = require('express');
const router = express.Router();

// Import and use the routers from other index.js files
const courseRouter = require('./course/index');
const instructorRouter = require('./instructor/index');
const refreshTokenRouter = require('./refresh-token/index');
const roadmapRouter = require('./Roadmap/index');
const studentsRouter = require('./Students/index');
const supervisordRouter = require('./supervisor/idex');

// Use the imported routers
router.use(courseRouter);
router.use(instructorRouter);
router.use(refreshTokenRouter);
router.use(roadmapRouter);
router.use(studentsRouter);
router.use(supervisordRouter);

module.exports = router;
