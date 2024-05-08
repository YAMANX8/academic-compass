const router = require('express').Router();
const authorization = require('../../../middleware/authorization');
const checkPermission = require('../../../middleware/check-permissions');
const get_Non_completed_Courses = require('../../../Utils/dashboardInstructor/course/my-non-completed-courses');

router.get('/in-progress-courses', authorization, async (req, res) => {
  try {
    const Id = req.user.userId;
    const roleId = req.user.roleId;
    //permission
    const hasAccess = await checkPermission(
      Id,
      'dashboardAccessToInstructor',
      roleId,
    );
    if (!hasAccess) {
      return res.status(403).json('Access denied');
    }
    // Get My_Non_completed_Courses .
    const My_Non_completed_Courses =
      await get_Non_completed_Courses.My_Non_completed_Courses(Id);
    // Response data
    const formattedData = {
      inProgressCourses:
        My_Non_completed_Courses.Data.Non_completed_Courses.map((course) => ({
          id: course.course_id,
          title: course.course_title,
          progress: ((course.progress * 100) / 12).toFixed(1),
          thumnail: course.course_thumnail,
        })),
    };

    res.status(200).json(formattedData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
