require("dotenv").config()
const router = require("express").Router()
const db = require("./db");
// const product = require("product")
const morgan = require("morgan");
const cors = require("cors");
const { Router } = require("express");


const app = express();
app.use(cors());
app.use(express.json());

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





