const jwt = require('jsonwebtoken');
const jwtGenerator = require('../Utils/jwt-generator');
const dotenv = require('dotenv');
dotenv.config();

// Middleware to handle token refresh
async function refreshTokenMiddleware(req, res) {
  const cookies = req.cookies;
  const refreshToken = cookies.jwt;

  if (!refreshToken) {
    return res.status(403).json({
      error: 'Not Authorized: No refresh token provided.',
      message: 'Access denied due to missing credentials.',
    });
  }
  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const { token } = jwtGenerator(payload.userId, payload.roleId);

    // Respond with the new access token
    return res.json({ token });
  } catch (error) {
    console.error(error.message);
    // Determine the type of error and respond accordingly
    const errorText =
      error.name === 'TokenExpiredError'
        ? 'Refresh token expired.'
        : 'Not Authorized: Invalid refresh token.';
    return res.status(403).json({
      error: errorText,
      message: 'Access denied due to invalid credentials.',
    });
  }
}

module.exports = refreshTokenMiddleware;
