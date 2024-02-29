const router = require('express').Router();
const roadmap = require('./Roadmap.js');
const addRoadmap = require('./addRoadmap.js');
const addProgressState = require('./addProgressState.js');

/*Roadmap*/
// Roadmap(all && specific map)
router.use('/AcademicCompass/roadmap', roadmap);

// addroadmaproadmap
router.use('/AcademicCompass/addroadmaproadmap', addRoadmap);

// addProgressState
router.use('/AcademicCompass/roadmap', addProgressState);

module.exports = router;
