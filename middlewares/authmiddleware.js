// middlewares/authmiddleware.js
const jwt = require('jsonwebtoken');
const { secret } = require('../utils');

exports.authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Token not provided' });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden - Invalid token' });
    }
    req.user = user;
    next();
  });
};
