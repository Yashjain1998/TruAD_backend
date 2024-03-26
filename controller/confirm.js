import User from "../database/mongo_schemar.js"
import Token from "../database/mongo_schema_token.js"
import path from "path";
import { fileURLToPath } from "url";
import pug from "pug";

async function Confirm(req, res) {
  try {
    const { token } = req.query;
    const existingToken = await Token.findOne({ token }).populate("user");

    if (!existingToken || existingToken.user.token === null) {
      return res.status(404).json({ message: "Invalid Token" });
    }

    const existingUser = existingToken.user;

    existingUser.token = undefined;

    existingUser.isVerified = true;

    await existingUser.save();

    await existingToken.deleteOne();

    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    const compileFunction = pug.compileFile(
      path.resolve(__dirname, "..", "views", "confirmEmail.pug")
    );

    const html = compileFunction();

    res.send(html);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Issue with server" });
  }
}

export default Confirm;
