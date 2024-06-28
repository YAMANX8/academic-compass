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


router.post('/supervisor/login', validInfo, async (req, res) => {
  try {
    // 1. destructure req.body
    const { email, password } = req.body;
    // 2. check supervisor doesn't exist (if not then throw error)
    const supervisor = await pool.query(
      `
        SELECT
          *
        FROM
          Users
        WHERE
          email = $1
      `,
      [email],
    );

    if (supervisor.rows.length == 0) {
      return res.status(401).json('Password or Email is incorrect');
    }

    // 3.Check if the supervisor is banned
    if (supervisor.rows[0].role_id === 4) {
      return res.status(403).json('This account is banned.');
    }
    // 4. check if incoming password is the same the database password
    const validPassword = await bcrypt.compare(
      password,
      supervisor.rows[0].password,
    ); //true or false
    if (!validPassword) {
      return res.status(401).json('Password or Email is incorrect');
    }

    // 5. give them the jwt token
    else if (validPassword) {
      const { token, refreshToken } = jwtGenerator(
        supervisor.rows[0].user_id,
        supervisor.rows[0].role_id,
      );

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        // sameSite: 'None',
        // secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({ token, user: supervisor.rows[0] });
    }
  } catch (error) {
    console.error(error);
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
