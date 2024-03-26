import bcrypt from "bcrypt";
import User from "../database/mongo_schemar.js";
import Token from "../database/mongo_schema_token.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { generateRandomToken } from "../utils/index.js";
import pug from "pug";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "aniketmukherjee5@gmail.com",
    pass: process.env.MAILER_KEY,
  },
});

async function Register(req, res) {
  try {
    const { name, password, email } = req.body;

    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain at least one special character, one uppercase character, and one number.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = await generateRandomToken();

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      token,
      isVerified: false,
    });

    await newUser.save();

    const newToken = new Token({
      token,
      user: newUser._id,
    });

    await newToken.save();

    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    const confirmationLink = `http://${req.get(
      "host"
    )}/api/confirm?token=${token}`;

    const compiledFunction = pug.compileFile(
      path.resolve(__dirname, "..", "views", "emailTemplate.pug")
    );

    // Render the HTML content using the compiled template
    const html = compiledFunction({ name, confirmationLink });

    const mailOptions = {
      from: "noreply@truad.co",
      to: email,
      subject: "Welcome to Aniket Corp - Please Confirm Your Email Address",
      html: html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
        res.status(500).json({ message: "Error sending email" });
      } else {
        console.log("Email sent: ", info.response);
        res.status(200).json({ message: "User successfully registered" });
      }
    });

    // res.status(200).send('Success');
  } catch (error) {
    console.log(error);
    res.status(500).send("Error registering user");
  }
}

export default Register;
