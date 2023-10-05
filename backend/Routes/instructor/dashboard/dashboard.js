const router = require("express").Router();
const pool = require("../../../Database/db");
const authorization = require("../../../middleware/authorization");
const getMyPerformanceNumber=require("../../../Utils/dashboardInstructor/myPerformance");

router.get("/", async (req, res, next) => {
  try {
    //* her use Id=1 Temporarily
    // const Id = req.user.userId;
    const Id =1;

    //* function for permission not completed
    // const hasAccess = await checkPermission(Id, "dashboard_access");
    // if (!hasAccess) {
    //   return res.status(403).json("Access denied");
    // }
    //get my performance number
    const myPerformance = await getMyPerformanceNumber.GetALlPerformanceNumber(
      Id
    );
    // Send the combined data in the response
    res.status(200).json(myPerformance);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;