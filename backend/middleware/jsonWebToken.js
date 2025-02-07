const jwt = require('jsonwebtoken');
require("dotenv").config();

// Function to generate a JWT
function generateAuthToken(user) {
  const payload = { // Information to include in the token
    userId: user._id,
    // ... any other user-related data you want in the token ...
  };
  
  const secretKey = process.env.JWT_SECRET || 'your_secret_key'; // Get from .env!
  const token = jwt.sign(payload, secretKey, { expiresIn: '5h' }); // Token expires in 1 hour

  return token;
}

function generateRefreshToken(user) {
  const payload = {
    userId: user._id,
  };

  const secretKey = process.env.JWT_REFRESH_SECRET || 'your_refresh_secret-abcdefgh'; // Different secret!!
  const token = jwt.sign(payload, secretKey, { expiresIn: '7d' }); // Longer expiration (e.g., 7 days)

  return token;
}

module.exports = {generateAuthToken, generateRefreshToken};