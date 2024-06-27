const router = require('express').Router();
const assigningRoadmaps = require('./dashboard/assigning-roadmap');
const instructors = require('./dashboard/instructors');
const register = require('./register/jwt-auth');


/*Supervisor*/

// dashboard: roadmaps
router.use('/AcademicCompass/dashboard/roadmaps', assigningRoadmaps);

// dashboard: instructors
router.use('/AcademicCompass/dashboard/instructors', instructors);

// register
router.use('/AcademicCompass/auth3', register);





module.exports = router;
