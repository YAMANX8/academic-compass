const db = require("../../Database/db");

// Insert Completed Items . 
const completed_items = async (itemId, Id) => {
    try {
        const values_itemId = [itemId];
        const values_Id = [Id];

        const courseQuery = "select course_id from items where item_id = $1;"
        const courseResult = await db.query(courseQuery, values_itemId);
        const course_id = courseResult.rows[0].course_id;

        const enrollmentQuery = `SELECT enrollment_id FROM enrollment WHERE student_id = $1 AND course_id = $2;`;
        const enrollmentResult = await db.query(enrollmentQuery, [values_Id[0], course_id]);
        const enrollId = enrollmentResult.rows[0].enrollment_id;

        // Here I Need To Check From Enrollmnet If Has Done This Item .
        const checkQuery = "select completed_item_id from completed_items where enrollment_id = $1 and item_id =$2;"
        const resultQuery = await db.query(checkQuery, [enrollId, values_itemId[0]]);


        if (resultQuery.rows.length == 0) {
            const query = `
            INSERT INTO Completed_Items(item_id,enrollment_id) VALUES($1,$2)
            `;
            const result = await db.query(query, [values_itemId[0], enrollId]);
            console.log("The item has been added"); 
            return false;
        } else {
            console.log("You Have Already Done it");
            return true;
        }
    } catch (err) {
        console.error("Error Insert Items");
    }
}

module.exports = {
    completed_items
};