const router = require('express').Router();
const pool = require('../../../Database/db');
const authorization = require('../../../middleware/authorization');
const checkPermission = require('../../../middleware/check-permissions');
const get_Completed_Courses = require('../../../Utils/dashboardInstructor/course/completed-courses');
const checkCourseCompletion = require('../../../Utils/dashboardInstructor/course/check-course-completion');

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
      completedCourses: Completed_Courses.Data.Completed_Courses.map(
        (course) => ({
          id: course.course_id,
          title: course.course_title,
          subtitle: course.subtitle,
          thumbnail: course.course_thumnail,
          courseStatus: course.course_status === 'Active' ? true : false,
          type: true,
        }),
      ),
    };

    res.status(200).json(formattedData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

// update course status
router.put(
  '/completed-courses/course-status/:courseId',
  authorization,
  async (req, res) => {
    try {
      const Id = req.user.userId;
      const roleId = req.user.roleId;
      const courseId = req.params.courseId;
      const { courseStatus } = req.body;
      // permission
      const hasAccess = await checkPermission(
        Id,
        'dashboardAccessToInstructor',
        roleId,
      );
      if (!hasAccess) {
        return res.status(403).json('Access denied');
      }
      // checke  if course is completed by courseId
      const isCompleted =
        await checkCourseCompletion.checkCourseCompletion(courseId);
        console.log(isCompleted);
      if (isCompleted) {
        // change status in database
        console.log(courseStatus,courseId);
        const value = [courseStatus, courseId];
        const query = `
        UPDATE course
        SET course_status = $1 
        WHERE course_id = $2
        `;
        await pool.query(query, value);
        res.status(201).json({
          message: 'Course status is updated successfully',
        });
      } else {
        res.status(400).json({
          message: 'Course is not completed',
          details:
            'The course does not meet all the required conditions to be marked as completed.',
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server Error');
    }
  },
);

module.exports = router;
