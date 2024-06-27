const router = require('express').Router();
const assigningRoadmaps = require('./roadmaps/assigning-roadmap');


/*Supercisor*/

// dashboard: roadmaps
router.use('/AcademicCompass/dashboard/roadmaps', assigningRoadmaps);



module.exports = router;
