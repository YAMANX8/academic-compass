const router = require("express").Router();
const db = require("../../../Database/db");


router.get("/show_items/:course_id", async (req, res) => {
    try {
        // ? Should Here Get instructor_id
        const course_id = req.params.course_id;
        const query = `
    SELECT 
    items.item_title,
    items.item_type
    FROM items
    join course ON items.course_id = course.course_id
    where items.course_id =$1;  
    `;
        const Values = [course_id];
        const result = await db.query(query, Values);
        res.json(result.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

router.post("/insert_item", async (req, res) => {
    try {
        const {
            item_title,
            item_description,
            item_no,
            course_id,
            topic_id,
            item_type,
            content_type
        } = req.body;

        const query = `
            INSERT INTO items
            (item_title, item_description, item_no, course_id, topic_id, item_type)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING item_id;
        `;

        const values = [item_title, item_description, item_no, course_id, topic_id, item_type];

        const result = await db.query(query, values);
        const my_item_id = result.rows[0].item_id;

        if (item_type === 2) {
            const videoQuery = `
                INSERT INTO video (video_path, item_id)
                VALUES ($1, $2);
            `;
            const videoValues = [content_type, my_item_id];
            await db.query(videoQuery, videoValues);
        } else {
            const articleQuery = `
                INSERT INTO article (article_body, item_id)
                VALUES ($1, $2);
            `;
            const articleValues = [content_type, my_item_id];
            await db.query(articleQuery, articleValues);
        }

        res.json("Item has been inserted.");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
