const router = require("express").Router();
const pool = require("../../Database/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../../Utils/jwtGenerator");
const validInfo = require("../../middleware/validInfo");
const authorization = require("../../middleware/authorization.js");
const multer = require("multer");

//add resume file to disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Upload/resume");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//register route

router.post(
  "/lecturer/register",
  upload.single("resume"),
  validInfo,
  async (req, res) => {
    try {
      // 1. destructure the req.body (first_name,last_name,email,password,resume)

      const { first_name, last_name, email, password } = req.body;

      // 2. check if lecturer request exist (if lecturer request exist then throw error)
      const lecturer = await pool.query(
        "SELECT * FROM Register_Request WHERE email=$1",
        [email]
      );
      if (lecturer.rows.length !== 0) {
        return res.status(401).json("lecturer request already exist");
      }

      // 3. Add status and time to a table request
      const status = "pending";
      const currentTime = new Date();
      const newRequest = await pool.query(
        "INSERT INTO request  (request_status,request_date) VALUES ($1,$2) RETURNING *",
        [status, currentTime]
      );

      // 4. Bcrypt the students password

      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const bcryptPassword = await bcrypt.hash(password, salt);

      // 5.enter the new register_request inside our database
      const resumeFilePath = req.file.path;
      console.log(resumeFilePath);
      await pool.query("SET client_encoding TO 'UTF8';");
      const newRegister_request = await pool.query(
        "INSERT INTO register_request  (first_name,last_name,email,password,resume,request_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
        [
          first_name,
          last_name,
          email,
          bcryptPassword,
          resumeFilePath,
          newRequest.rows[0].request_id,
        ]
      );

      // 6.generating our jwt token
      const token = jwtGenerator(newRegister_request.rows[0].register_id);

      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//  correct token
router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
