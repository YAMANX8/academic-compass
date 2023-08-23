const router = require("express").Router();
const pool = require("../../../Database/db");
const authorization = require("../../../middleware/authorization.js");
const count = require("../../../Utils/countDashboardS");
const inprogresInfo=require("../../../Utils/coursesInprogresInfo");
const completCourseInfo=require("../../../Utils/CompletedCourse");
router.get("/:id", async (req, res,next) => {
  try {
    // const Id = req.student.studentId;
    const Id = req.params.id;
    //get information to student
    const studentInfo = await pool.query(
      "SELECT * FROM student WHERE student_id = $1",
      [Id]
    );
    // get Info about courses count
    const countData = await count.GetCoursesNumberInfo(Id);
    // get TotalPint
    const TotalPoint = await count.GetTotalPoit(Id);
    // get InprogresInfo
    const InprogresInfo = await inprogresInfo.InProgresCourseInfo(Id);
    // get completionPercentage
    const completionPercentage = await inprogresInfo.completionPercentage(Id);
    // get stars Number
    const strs = await inprogresInfo.starsNumber(Id);
    // get GetCompletedCourse
    const GetCompletedCourse = await completCourseInfo.GetCompletedCourse(Id);

    // Combine all data into a single object
    const responseData = {
      studentInfo: studentInfo.rows[0],
      countData: countData.Data.data,
      totalPointData: TotalPoint.Data.data,
      inprogresInfoData: InprogresInfo.Data.data,
      completionPercentageData: completionPercentage.Data.data,
      starsData: strs.Data.data,
      completedCourseData: GetCompletedCourse.Data.data,
    };

    // Send the combined data in the response
    res.json(responseData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
