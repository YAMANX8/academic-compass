const router = require("express").Router();
const pool = require("../../Database/db");

router.get("/RoadMap", async (req, res) => {
    try {
        const queryreuslut = await db.query("SELECT * FROM Roadmap");
        res.status(200).json({
            status: "success",
            reuslut: queryreuslut.rows.length,
            data: {
                datareuslt: queryreuslut.rows,
            }
        })
    } catch (err) {
        console.log(err)
    }
})
module.exports = router;