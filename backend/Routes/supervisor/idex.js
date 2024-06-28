const router = require('express').Router();
const assigningRoadmaps = require('./dashboard/assigning-roadmap');
const instructors = require('./dashboard/instructors');
const instructorProfile = require('./dashboard/instructor-profile');
const register = require('./register/jwt-auth');


/*Supervisor*/

// dashboard: roadmaps
router.use('/AcademicCompass/dashboard/roadmaps', assigningRoadmaps);

// dashboard: instructors
router.use('/AcademicCompass/dashboard/instructors', instructors);

// dashboard: instructor-profile
router.use('/AcademicCompass/dashboard/instructor-profile', instructorProfile);

// register
router.use('/AcademicCompass/auth3', register);





module.exports = router;
