const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401); // Unauthorized - No token
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, { algorithm: 'HS256'});
    req.session.user = decoded; // Attach the decoded payload to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    return res.sendStatus(403); // Forbidden - Invalid token
  }
};

module.exports = authenticateToken;