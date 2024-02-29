const router = require('express').Router();
const roadmap = require('./roadmap.js');
const addRoadmap = require('./add-roadmap.js.js');
const addProgressState = require('./add-progress-state.js.js');

/*Roadmap*/
// Roadmap(all && specific map)
router.use('/AcademicCompass/roadmap', roadmap);

// addroadmaproadmap
router.use('/AcademicCompass/addroadmaproadmap', addRoadmap);

// addProgressState
router.use('/AcademicCompass/roadmap', addProgressState);

module.exports = router;
