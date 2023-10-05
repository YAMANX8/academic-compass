const router = require("express").Router();
const pool = require("../../../Database/db");
const authorization = require("../../../middleware/authorization");
const getMyPerformanceNumber=require("../../../Utils/dashboardInstructor/myPerformance");
const getMyProfile=require("../../../Utils/dashboardInstructor/MyProfile");

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

    //Response Our Date
    const responseData = {
      myPerformance,
      myProfile
    };
    res.status(200).json(responseData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;