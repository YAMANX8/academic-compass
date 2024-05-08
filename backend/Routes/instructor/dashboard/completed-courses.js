const router = require('express').Router();
const authorization = require('../../../middleware/authorization');
const checkPermission = require('../../../middleware/check-permissions');
const get_Completed_Courses = require('../../../Utils/dashboardInstructor/course/completed-courses');

router.get('/completed-courses', authorization, async (req, res) => {
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
    // Get Completed_Courses .
    const Completed_Courses = await get_Completed_Courses.Completed_Courses(Id);
    // Response data
    const formattedData = {
      completed_courses: Completed_Courses.Data.Completed_Courses.map(
        (course) => ({
          id: course.course_id,
          title: course.course_title,
          subtitle: course.subtitle,
          thumnail: course.course_thumnail,
        }),
      ),
    };

    res.status(200).json(formattedData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;