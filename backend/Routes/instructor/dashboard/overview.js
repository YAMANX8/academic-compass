const router = require('express').Router();
const authorization = require('../../../middleware/authorization');
const checkPermission = require('../../../middleware/check-permissions');
const getMyPerformanceNumber = require('../../../Utils/dashboardInstructor/my-performance');
const getMyProfile = require('../../../Utils/dashboardInstructor/my-profile');
const getMyTopics = require('../../../Utils/dashboardInstructor/my-topics');

router.get('/overview', async (req, res) => {
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
    // get my performance number
    const myPerformance =
      await getMyPerformanceNumber.GetALlPerformanceNumber(Id);
    // Get Genral Info About Instructor .
    const myProfile = await getMyProfile.myProfile(Id);
    //Get My topics
    const myTopics = await getMyTopics.GetMyTopics(Id);

    // Response data
    const formattedData = {
      instructor_rating: parseFloat(myProfile.Data.Instructoer_Rating.avg),
      performance: [
        {
          id: 1,
          title: 'Enrollments',
          count: parseInt(myPerformance.Data.totalEnrollments),
        },
        {
          id: 2,
          title: 'Reviews',
          count: parseInt(myPerformance.Data.totalReviews),
        },
        {
          id: 3,
          title: 'Courses',
          count: parseInt(myPerformance.Data.totalCourses),
        },
        {
          id: 4,
          title: 'Students',
          count: parseInt(myPerformance.Data.totalStudents),
        },
      ],
      roadmaps: myTopics.Data.mytopic.map((topic) => ({
        roadmap_id: topic.roadmap_id,
        title: topic.roadmap_title,
        image: `http://localhost:5000/image/${topic.image_path}`,
      })),
    };

    res.status(200).json(formattedData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

module.exports = router;
