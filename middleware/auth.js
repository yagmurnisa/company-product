const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    console.log("no token");
    return res.status(400).json({ msg: 'Authorization failed' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log("token does not match");
    res.status(401).json({ msg: 'Authorization failed' });
  }
};