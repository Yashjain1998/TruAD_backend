import path from 'path';
import { fileURLToPath } from 'url';
import pug from 'pug';
import jwt from 'jsonwebtoken';

// function verifyToken(req, res, next) {
//     const bearerHeader = req.headers["authorization"];
//     if (typeof bearerHeader !== 'undefined') {
//         const token = bearerHeader.split(" ")[1];

//         req.token = token;
//         next();
//     } else {
//         //Code to handle the scenario when a JWT is not present
//         // const __dirname = path.dirname(fileURLToPath(import.meta.url));
//         // const compileFunction = pug.compileFile(path.resolve(__dirname, "..", "views", "jwtError.pug"));
//         // const html = compileFunction();
//         // res.send(html);
//         res.status(403).json({message: "Unauthorized"})
//     }
// }


// Middleware for verifying the token


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