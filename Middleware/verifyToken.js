import jwt from 'jsonwebtoken';

// Middleware to validate token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']; // Typically token is sent in the "Authorization" header

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id; // Save the decoded token id in request for use in the controller
    next();
  });
};
export default verifyToken