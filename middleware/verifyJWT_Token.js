import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers['authorization'];

  // Check if token is not present
  if (!token) {
    return res.status(403).send({ message: 'A token is required for authentication' });
  }

  try {
    // Verify the token using the same secret used to sign it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the user payload to the request object
    req.user = decoded;
  } catch (err) {
    // If token is not valid or expired, return an error
    return res.status(401).send({ message: 'Invalid Token' });
  }
  
  // If everything is fine, move to the next middleware
  return next();
};

export default verifyToken;