const router = require("express").Router();
const coresContent = require("./Course Content/course_content");
const courseStatus = require("./Course Info Page/Course_Stauts");
const courseEnrollment = require("./Course Info Page/Course_Stauts");
const ShowReview = require("./Course Info Page/Show_Review");
const createCouse = require("./createCourse/createCourse");
const dashboard = require("./dashboard/dashboard");
const editeCoursePage = require("./editCoursePage/editCourseInfo");
const register = require("./register/jwtAuth");
const settings = require("./settings/setting");
const showStudentProfile = require("./showingStudentProfile/studentProfile");
/*Instructor*/
// Course Content
router.use("/AcademicCompass/instructor/Course_Content", coresContent);

// Course Info page: courseStatus
router.use("/AcademicCompass/CourseInfo/CourseStatus", courseStatus);

// Course Info page: Enrollment
router.use("/AcademicCompass/CourseInfo/courseEnrollment", courseEnrollment);

// Course Info page: ShowReview
router.use("/AcademicCompass/CourseInfo/ShowReview", ShowReview);

// createCourse
router.use("/AcademicCompass/instructor/createCourse", createCouse);

// dashboard
router.use("/AcademicCompass/instructor/dashboard", dashboard);

// editCoursePage
router.use("/AcademicCompass/instructor/editeCourseInfo", editeCoursePage);

// register
router.use("/AcademicCompass/auth2", register);

// settings
router.use("/AcademicCompass/instructor/setting", settings);

// showStudentProfile
router.use("/AcademicCompass/instructor/studentProfile", showStudentProfile);

module.exports = router;
