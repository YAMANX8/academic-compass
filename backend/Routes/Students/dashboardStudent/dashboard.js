const router = require("express").Router();
const pool = require("../../../Database/db");
const authorization = require("../../../middleware/authorization");
const count = require("../../../Utils/dashboard/countDashboardS");
const inprogresInfo = require("../../../Utils/dashboard/coursesInprogresInfo");
const completCourseInfo = require("../../../Utils/dashboard/CompletedCourse");
const MyRoadmaps=require("../../../Utils/dashboard/MyRoadmaps");
const bringdataQuizETS =require("../../../Utils/dashboard/bringdataQuizETS");
const bring_All_Courses_Number =require("../../../Utils/dashboard/bring_All_Courses_Number");

router.get("/", authorization, async (req, res, next) => {
  try {
    const Id = req.student.studentId;
    // const Id = req.params.id;
    //get information to student
    const studentInfo = await pool.query(
      "SELECT * FROM student WHERE student_id = $1",
      [Id]
    );
    // get Info about courses count to student
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
    // get Student Roadmap . 
    const MyRoadmap = await MyRoadmaps.MyRoadmapsInfo(Id);
    // get quiz video and artical
    const Get_Quiz_Vedio_Artical = await bringdataQuizETS.qva(Id);
    // get All Courses Number
    const Get_All_Courses_Number = await bring_All_Courses_Number.Get_All_Courses_Number(Id);
    // Combine all data into a single object
    const responseData = {
      studentInfo: studentInfo.rows[0],
      countData: countData.Data.data,
      totalPointData: TotalPoint.Data.data,
      inprogresInfoData: InprogresInfo.Data.data,
      completionPercentageData: completionPercentage.Data.data,
      starsData: strs.Data.data,
      completedCourseData: GetCompletedCourse.Data.data,
      MyRoadmap: MyRoadmap.Data.data,
      Get_Quiz_Vedio_Artical : Get_Quiz_Vedio_Artical.Data.data,
      Get_All_Courses_Number : Get_All_Courses_Number.Data.data
    };

    // Send the combined data in the response
    res.status(200).json(responseData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
