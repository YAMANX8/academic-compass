const router = require("express").Router();
const pool = require("../../../Database/db");
const checkPermission = require("../../../middleware/checkPermissions");
const authorization = require("../../../middleware/authorization");
const multer = require("multer");
const path = require("path");
const { response } = require("express");

//upload image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Upload/Images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});
const upload = multer({ storage: storage });

router.put("/:id", authorization, upload.single("image"), async (req, res) => {
  try {
    const instructorId = req.user.userId;
    const roleId = req.user.roleId;
    const courseId = req.params.id;
    let {
      title,
      subtitle,
      level,
      type,
      description,
      whoFor,
      whatLearn,
      prerequisites,
      updateWhoFor,
      updateWhatLearn,
      updatePrerequisites,
      isActive,
    } = req.body;
    whatLearn = JSON.parse(whatLearn)
    whoFor = JSON.parse(whoFor)
    prerequisites = JSON.parse(prerequisites)
    updateWhoFor = JSON.parse(updateWhoFor)
    updateWhatLearn = JSON.parse(updateWhatLearn)
    updatePrerequisites = JSON.parse(updatePrerequisites)
 
    // Permission check
    //* This permission has not been added to the database("updateCourse")
    const hasAccess = await checkPermission(
      instructorId,
      "updateCourse",
      roleId
    );

    if (!hasAccess) {
      return res.status(403).json("Access denied");
    }

    //handling the image
    let imageFilePath = null;
    if (req.file && req.file.filename) {
      imageFilePath = encodeURIComponent(req.file.filename);
    }
    // get data from course
    const getQuery1 = `
    SELECT course_title , subtitle, course_level, course_type, course_description,course_thumnail FROM course WHERE course_id=$1
    `;
    const gatValue = [courseId];
    const getResult = await pool.query(getQuery1, gatValue);

    //* update course
    if (getResult && getResult.rows.length < 2) {
      const updateQuery = `  UPDATE course
  SET
    course_title = $1,
    subtitle = $2,
    course_level = $3,
    course_type = $4,
    course_description = $5,
    course_thumnail=$6,
    course_status=$7
  WHERE course_id =$8`;
      const updateValue = [
        title,
        subtitle,
        level,
        type,
        description,
        imageFilePath,
        isActive,
        courseId,
      ];
      const updateResult = await pool.query(updateQuery, updateValue);
    } else {
      console.error(err.message);
      res.status(500).json("Server Error");
    }

    // get data from Course_Lists
    const getQuery2 = `
    SELECT list_id,item_body,list_type FROM Course_Lists WHERE course_id =$1
    `;
    const gatValue2 = [courseId];
    const getResult2 = await pool.query(getQuery2, gatValue2);
    // function to update data
    const update = async (item_body, course_id, list_id, list_type) => {
      try {
        const update = `UPDATE Course_Lists
          SET
          item_body=$1
          WHERE course_id =$2 AND list_id=$3 AND list_type=$4`;
        const updateValue = [item_body, course_id, list_id, list_type];
        const updateResult = await pool.query(update, updateValue);
      } catch (err) {
        console.error("Error  : ", err);
        return {
          status: "error",
          message: "Error Update data is faild",
        };
      }
    };

    // function to insert data
    const insert = async (item_body, item_order, list_type) => {
      try {
        const insertQuery = `INSERT INTO Course_Lists (item_body,item_order,list_type,course_id)
      VALUES
      ($1,$2,$3,$4)`;
        const insertValue = [item_body, item_order, list_type, courseId];
        const insertResult = await pool.query(insertQuery, insertValue);
      } catch (err) {
        console.error("Error  : ", err);
        return {
          status: "error",
          message: "Error insert data is faild",
        };
      }
    };
    // insert for courseList
    if (true) {
      const item = getResult2.rows;
      let found = false;

      if (whoFor && whoFor.length > 0) {
        whoFor.forEach((el) => {
          item.forEach((item) => {
            if (
              item.item_body === el.item_body &&
              item.list_type === el.list_type
            ) {
              found = true;
            }
          });
          if (found !== true) {
            insert(el.item_body, el.item_order, el.list_type);
            found = false;
          }
        });
      }
      if (whatLearn && whatLearn.length > 0) {
        whatLearn.forEach((el) => {
          item.forEach((item) => {
            if (
              item.item_body === el.item_body &&
              item.list_type === el.list_type
            ) {
              found = true;
            }
          });
          if (found !== true) {
            insert(el.item_body, el.item_order, el.list_type);
            found = false;
          }
        });
      }
      if (prerequisites && prerequisites.length > 0) {
        prerequisites.forEach((el) => {
          item.forEach((item) => {
            if (
              item.item_body === el.item_body &&
              item.list_type === el.list_type
            ) {
              found = true;
            }
          });
          if (found !== true) {
            insert(el.item_body, el.item_order, el.list_type);
            found = false;
          }
        });
      }
    }
    //update for courseList
    if (getResult2 && getResult2.rows.length > 0) {
      const item = getResult2.rows;
      let list_id = 0;

      if (updateWhoFor && updateWhoFor.length > 0) {
        updateWhoFor.forEach((el) => {
          let found = false;

          for (let i = 0; i < item.length; i++) {
            if (
              item[i].item_body === el.item_body &&
              item[i].list_type === el.list_type
            ) {
              found = true;
              list_id = item[i].list_id;
              break;
            }
          }
          if (found === true) {
            update(el.newitem_body, courseId, list_id, el.list_type);
            found = false;
          }
        });
      }

      if (updateWhatLearn && updateWhatLearn.length > 0) {
        updateWhatLearn.forEach((el) => {
          let found = false;

          for (let i = 0; i < item.length; i++) {
            if (
              item[i].item_body === el.item_body &&
              item[i].list_type === el.list_type
            ) {
              found = true;
              list_id = item[i].list_id;
              break;
            }
          }
          if (found === true) {
            update(el.newitem_body, courseId, list_id, el.list_type);
            found = false;
          }
        });
      }

      if (updatePrerequisites && updatePrerequisites.length > 0) {
        updatePrerequisites.forEach((el) => {
          let found = false;

          for (let i = 0; i < item.length; i++) {
            if (
              item[i].item_body === el.item_body &&
              item[i].list_type === el.list_type
            ) {
              found = true;
              list_id = item[i].list_id;
              break;
            }
          }
          if (found === true) {
            update(el.newitem_body, courseId, list_id, el.list_type);
            found = false;
          }
        });
      }
    }
    // get new data
    const getNewData = async (courseid) => {
      try {
        //course data
        const newCoursequery = `SELECT 
        course_title,
        subtitle,
        ct.type_name,
        l.level_name,
        course_type,
        course_description,
        course_thumnail,
        course_status
        FROM course
        JOIN Courses_Type ct ON course.course_type = ct.type_id
        JOIN Levels l ON course.course_level = l.level_id
        WHERE course_id = $1`;
        const courseValue = [courseid];
        const Result = await pool.query(newCoursequery, courseValue);

        // Get new course list data
        const getCourseListQuery = `
         SELECT list_id, item_body, item_order, list_type
         FROM Course_Lists
         WHERE course_id = $1;
        `;
        const getCourseListValues = [courseid];
        const courseListResult = await pool.query(
          getCourseListQuery,
          getCourseListValues
        );
         return {
           Data: {
             newCourseData: Result.rows,
             newCourseListData: courseListResult.rows
           },
         };
      } catch (err) {
        console.error("Error  : ", err);
        return {
          status: "error",
          message: "Error Update data is faild",
        };
      }
    };
    const newData= await getNewData(courseId);
    console.log(newData);
    // Initialize JSON response object
    const jsonResponse = {
      title: "",
      subtitle: "",
      level: "",
      type: "",
      description: "",
      whoFor: [],
      whatLearn: [],
      prerequisites: [],
      thumbnail: "",
      isActive: false,
    };
    // Populate JSON response based on list_type
    newData.Data.newCourseListData.forEach((row) => {
      const item = {
        item_body: row.item_body,
        item_order: row.item_order,
      };

      if (row.list_type === 1) {
        jsonResponse.whatLearn.push(item);
      } else if (row.list_type === 2) {
        jsonResponse.whoFor.push(item);
      } else if (row.list_type === 3) {
        jsonResponse.prerequisites.push(item);
      }
    });
    //* decode image
    // Populate the remaining fields
    if (newData.Data.newCourseData.length > 0) {
      jsonResponse.title = newData.Data.newCourseData[0].course_title;
      jsonResponse.subtitle = newData.Data.newCourseData[0].subtitle;
      jsonResponse.level = newData.Data.newCourseData[0].level_name;
      jsonResponse.type = newData.Data.newCourseData[0].type_name;
      jsonResponse.description = newData.Data.newCourseData[0].course_description;
      jsonResponse.thumbnail = newData.Data.newCourseData[0].course_thumnail;
      jsonResponse.isActive = newData.Data.newCourseData[0].course_status;
    }

    res.status(200).json(jsonResponse);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// Get course data
router.get("/:id", authorization, async (req, res) => {
  try {
    const instructorId = req.user.userId;
    const roleId = req.user.roleId;
    const courseId = req.params.id;

    // Permission check
    //* This permission has not been added to the database
    const hasAccess = await checkPermission(
      instructorId,
      "updateCourse",
      roleId
    );

    if (!hasAccess) {
      return res.status(403).json("Access denied");
    }

    // Get course data
    const getCourseQuery = `
    SELECT 
      course_title,
      subtitle,
      ct.type_name,
      l.level_name,
      course_type,
      course_description,
      course_thumnail,
      course_status
    FROM course
    JOIN Courses_Type ct ON course.course_type = ct.type_id
    JOIN Levels l ON course.course_level = l.level_id
    WHERE course_id = $1
    `;
    const getCourseValues = [courseId];
    const courseResult = await pool.query(getCourseQuery, getCourseValues);

    // Get course list data
    const getCourseListQuery = `
    SELECT list_id, item_body, item_order, list_type
    FROM Course_Lists
    WHERE course_id = $1;
    `;
    const getCourseListValues = [courseId];
    const courseListResult = await pool.query(
      getCourseListQuery,
      getCourseListValues
    );

    // Initialize JSON response object
    const jsonResponse = {
      title: "",
      subtitle: "",
      level: "",
      type: "",
      description: "",
      whoFor: [],
      whatLearn: [],
      prerequisites: [],
      thumbnail: "",
      isActive: false,
    };

    // Populate JSON response based on list_type
    courseListResult.rows.forEach((row) => {
      const item = {
        item_body: row.item_body,
        item_order: row.item_order,
      };

      if (row.list_type === 1) {
        jsonResponse.whatLearn.push(item);
      } else if (row.list_type === 2) {
        jsonResponse.whoFor.push(item);
      } else if (row.list_type === 3) {
        jsonResponse.prerequisites.push(item);
      }
    });
    //* decode image
    // Populate the remaining fields
    if (courseResult.rows.length > 0) {
      jsonResponse.title = courseResult.rows[0].course_title;
      jsonResponse.subtitle = courseResult.rows[0].subtitle;
      jsonResponse.level = courseResult.rows[0].level_name;
      jsonResponse.type = courseResult.rows[0].type_name;
      jsonResponse.description = courseResult.rows[0].course_description;
      jsonResponse.thumbnail = courseResult.rows[0].course_thumnail;
      jsonResponse.isActive = courseResult.rows[0].course_status;
    }

    res.status(200).json(jsonResponse);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;

`roadmap=# SELECT * FROM list_type;
-[ RECORD 1 ]------------------------------------------
type_id   | 1
type_name | In this course you will learn the following
-[ RECORD 2 ]------------------------------------------
type_id   | 2
type_name | Who this course is for:
-[ RECORD 3 ]------------------------------------------
type_id   | 3
type_name | Requirements`;
