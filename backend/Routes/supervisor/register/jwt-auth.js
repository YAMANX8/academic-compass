const router = require('express').Router();
const pool = require('../../../database/db.js');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../../../Utils/jwt-generator.js');
const validInfo = require('../../../middleware/valid-info.js');
const authorization = require('../../../middleware/authorization.js');
const dotenv = require('dotenv');
dotenv.config();

//register route
router.post('/supervisor/register', validInfo, async (req, res) => {
  try {
    // 1. destructure the req.body (first_name, last_name, email, password)
    const { first_name, last_name, email, password } = req.body;
    const role_id = 3;
    const joining_date = new Date().toISOString().split('T')[0]; 

    // 2. check if supervisor exists
    const supervisor = await pool.query(
      'SELECT * FROM users WHERE email=$1',
      [email]
    );
    if (supervisor.rows.length !== 0) {
      return res.status(401).json('Supervisor already exists or the account is used');
    }

    // 3. Bcrypt the supervisor's password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4. Insert the new supervisor into the database
    const newSupervisor = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password, role_id, joining_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [first_name, last_name, email, bcryptPassword, role_id, joining_date]
    );

    // 5. Generate JWT token
    const { token, refreshToken } = jwtGenerator(
      newSupervisor.rows[0].user_id,
      newSupervisor.rows[0].role_id
    );
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      // sameSite: 'Lax',
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ token, user: newSupervisor.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

//  correct token
router.get('/me', authorization, async (req, res) => {
  try {
    // user
    const userId = req.user.userId;
    const roleId = req.user.roleId;
    let query = '';
    let value;
    // user is student
    if (roleId === 2) {
      query = `SELECT * FROM student WHERE student_id = $1`;
      value = [userId];
    } else if (roleId === 1 || roleId === 3) {
      query = `SELECT * FROM users WHERE user_id = $1`;
      value = [userId];
    } else {
      return res.status(403);
    }
    const Result = await pool.query(query, value);
    if (Result.rows[0] !== undefined) {
      return res.status(200).json({ user: Result.rows[0] });
    } else {
      return res.status(404);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
