const router = require('express').Router();
const coresContent = require('./course-content/course-content');
const courseStatus = require('./course-info-page/course-stauts');
const courseEnrollment = require('./course-info-page/enrollment');
const ShowReview = require('./course-info-page/show-review');
const createCouse = require('./create-course/create-course');
const completedCourses = require('./dashboard/completed-courses');
const inProgressCourses = require('./dashboard/in-progress-courses');
const overview = require('./dashboard/overview');
const editeCoursePage = require('./edit-course-page/edit-course-info');
const register = require('./register/jwt-auth');
const settings = require('./settings/setting');
const showStudentProfile = require('./showing-student-profile/student-profile');
const showCurriculumInfo = require('./content_management_system/curriculum/curriculum');

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

// overview
router.use('/AcademicCompass/instructor/dashboard', overview);

// completed courses
router.use('/AcademicCompass/instructor/dashboard', completedCourses);

// in-progress courses
router.use('/AcademicCompass/instructor/dashboard', inProgressCourses);

// edit course page
router.use('/AcademicCompass/instructor/editeCourseInfo', editeCoursePage);

// register
router.use('/AcademicCompass/auth2', register);

// settings
router.use('/AcademicCompass/instructor/setting', settings);

// showStudentProfile
router.use('/AcademicCompass/instructor/studentProfile', showStudentProfile);

// showCurriculumInfo
router.use(
  '/AcademicCompass/instructor/content_management_system',
  showCurriculumInfo,
);


module.exports = router;
