const router = require('express').Router();
const coresContent = require('./Course Content/course_content');
const courseStatus = require('./Course Info Page/course-stauts');
const courseEnrollment = require('./Course Info Page/enrollment');
const ShowReview = require('./Course Info Page/show-review');
const createCouse = require('./createCourse/create-course');
const dashboard = require('./dashboard/dashboard');
const editeCoursePage = require('./editCoursePage/edit-course-info');
const register = require('./register/jwt-auth');
const settings = require('./settings/setting');
const showStudentProfile = require('./showingStudentProfile/student-profile');

/*Instructor*/
// Course Content
router.use('/AcademicCompass/instructor/Course_Content', coresContent);

// Course Info page: courseStatus
router.use('/AcademicCompass/CourseInfo/CourseStatus', courseStatus);

// Course Info page: Enrollment
router.use('/AcademicCompass/CourseInfo/courseEnrollment', courseEnrollment);

// Course Info page: ShowReview
router.use('/AcademicCompass/CourseInfo/ShowReview', ShowReview);

// createCourse
router.use('/AcademicCompass/instructor/createCourse', createCouse);

// dashboard
router.use('/AcademicCompass/instructor/dashboard', dashboard);

// editCoursePage
router.use('/AcademicCompass/instructor/editeCourseInfo', editeCoursePage);

// register
router.use('/AcademicCompass/auth2', register);

// settings
router.use('/AcademicCompass/instructor/setting', settings);

// showStudentProfile
router.use('/AcademicCompass/instructor/studentProfile', showStudentProfile);

module.exports = router;
