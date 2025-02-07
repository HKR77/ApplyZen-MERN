// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // console.log('hit middleware');
  const token = req.header('Authorization')?.split(' ')[1];   // Get token from header


  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key'); // Verify token
    req.user = decoded; // Add user information to the request object
    next(); // Proceed to the next middleware/route
  } catch (err) {
    if (err.name === 'TokenExpiredError') { // Check if it's a token expiration error
      return res.status(401).json({ message: 'Token expired' }); // Send 401 back
    }
    res.status(401).json({ message: 'Token is not valid' });
  }
}

module.exports = authMiddleware;