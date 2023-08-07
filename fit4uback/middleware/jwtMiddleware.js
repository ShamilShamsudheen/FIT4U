const jwt = require('jsonwebtoken');
require('dotenv').config()

const secretKey = process.env.JWT_SECRET_KEY; 
const jwtMiddleware = (req, res, next) => {
  console.log(req.header.Authorization)
  const token = req.header('Authorization')?.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    req.user = decodedToken; 
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
};

module.exports = jwtMiddleware;
