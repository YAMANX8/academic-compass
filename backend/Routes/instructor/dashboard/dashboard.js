const router = require("express").Router();
const pool = require("../../../Database/db");
const authorization = require("../../../middleware/authorization");
const getMyPerformanceNumber=require("../../../Utils/dashboardInstructor/myPerformance");
const getMyProfile=require("../../../Utils/dashboardInstructor/MyProfile");
const get_Non_completed_Courses=require("../../../Utils/dashboardInstructor/course/My Non-completed Courses");
const get_Completed_Courses = require("../../../Utils/dashboardInstructor/course/completed Courses");

router.get("/", async (req, res, next) => {
  try {
    //* here use Id=1 Temporarily
    // const Id = req.user.userId;
    const Id =1;

    //* function for permission not completed
    // const hasAccess = await checkPermission(Id, "dashboard_access");
    // if (!hasAccess) {
    //   return res.status(403).json("Access denied");
    // }
    // get my performance number
    const myPerformance = await getMyPerformanceNumber.GetALlPerformanceNumber(Id);
    // Get Genral Info About Instructor .
    const myProfile = await getMyProfile.myProfile(Id);
    // Get My_Non_completed_Courses .
    const My_Non_completed_Courses = await get_Non_completed_Courses.My_Non_completed_Courses(Id);
    // Get Completed_Courses .
    const Completed_Courses = await get_Completed_Courses.Completed_Courses(Id);

    //Response Our Date
    const responseData = {
      myPerformance,
      myProfile,
      My_Non_completed_Courses,
      Completed_Courses
    };
    res.status(200).json(responseData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;