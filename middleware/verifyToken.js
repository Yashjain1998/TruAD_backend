import path from 'path';
import { fileURLToPath } from 'url';
import pug from 'pug';

function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(" ")[1];

        req.token = token;
        next();
    } else {
        //Code to handle the scenario when a JWT is not present
        // const __dirname = path.dirname(fileURLToPath(import.meta.url));
        // const compileFunction = pug.compileFile(path.resolve(__dirname, "..", "views", "jwtError.pug"));
        // const html = compileFunction();
        // res.send(html);
        res.status(403).json({message: "Unauthorized"})
    }
}

export default verifyToken;