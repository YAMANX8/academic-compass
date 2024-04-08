const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to continue only if the token is present in the Authorization header
module.exports = function (req, res, next) {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({
          error: 'Authentication Error: No token provided',
          message: 'Authentication required.',
        });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from "Bearer <token>"
    if (!token) {
      return res
        .status(401)
        .json({
          error: 'Authentication Error: Invalid token format.',
          message: 'Authentication required.',
        });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET); // Use standardized env variable name
    req.user = {
      userId: payload.userId,
      roleId: payload.roleId,
    };
    next();
  } catch (error) {
    console.error(error.message);
    return res
      .status(401)
      .json({
        error: 'Authentication Error: Token verification failed.',
        message: 'Authentication required.',
      });
  }
};
