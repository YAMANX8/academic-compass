const db = require("../../Database/db");

// Insert Completed Items . 
const completed_items = async (itemId, Id) => {
    try {
        const values_itemId = [itemId];
        // console.log(itemId);
        const values_Id = [Id];
        // console.log(Id)
        const courseQuery = "select course_id from items where item_id = $1;"
        const courseResult = await db.query(courseQuery , values_itemId);
        const course_id = courseResult.rows[0].course_id;
        // console.log(course_id);

        const enrollmentQuery = `SELECT enrollment_id FROM enrollment WHERE student_id = $1 AND course_id = $2;`;
        // const enrollmentValues = [values_Id,course_id];
        // console.log(enrollmentValues)
        const enrollmentResult = await db.query(enrollmentQuery, [values_Id[0], course_id]);

        const enrollId = enrollmentResult.rows[0].enrollment_id;
        // console.log(enrollId);

        const query = `
        INSERT INTO Completed_Items(item_id,enrollment_id) VALUES($1,$2)
        `;
        // console.log(query)
        // const values_re = [itemId , enrollId]
        // console.log(values_re)
        const result = await db.query(query, [values_itemId[0] , enrollId]);
        // console.log(result)
    } catch (err) {
        console.error("Error Insert Itmes");
    }
}

module.exports = {
    completed_items
  };