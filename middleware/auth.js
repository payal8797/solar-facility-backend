const jwt = require('jsonwebtoken');

const JWT_SECRET = 'UNSAFE_STRING';

// Middleware function to authenticate incoming requests using JWT
const authMiddleware = (req, res, next) => {
  
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Extract the JWT token from the Authorization header, verify the JWT token and decode its payload
  const token = req.headers.authorization.split('Bearer ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const generateToken = (user) => {
  return jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { authMiddleware, generateToken };



