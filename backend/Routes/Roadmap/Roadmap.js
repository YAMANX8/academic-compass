const router = require("express").Router();
const pool = require("../../Database/db");

router.get("/", async (req, res) => {
    try {
        const queryreuslut = await pool.query("SELECT * FROM Roadmap");
            const decodedData = queryreuslut.rows.map((row) => {
              const decodedImagePath = decodeURIComponent(row.image_path);
              return {
                ...row,
                image_path: decodedImagePath,
              };
            });
        res.status(200).json({
          status: "success",
          reuslut: queryreuslut.rows.length,
          data: {
            datareuslt: decodedData,
          },
        });
    } catch (err) {
        console.log(err)
    }
})
module.exports = router;