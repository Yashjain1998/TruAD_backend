import User from "../database/mongo_schemar.js"
import { generateRandomOTP } from "../utils/index.js"
import OTP from "../database/mongo_schema_OTP.js"
import nodemailer from "nodemailer";

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

const ForgotPassword = async(req, res) => {
    const {email} = req.body

    const existingUser = await User.findOne({email})

    if(!existingUser){
        return res.status(404).json({message: "User does not exist"})
    }

    const otp = generateRandomOTP()

    const newOTP = new OTP({
        otp,
        user: existingUser._id
    })

    await newOTP.save()

    const mailOptions = {
        from: "aniketmukherjee5@gmail.com",
        to: email,
        subject: "OTP for Password Regenaration",
        text: `Please use the following OTP to regenerate the passoword for your Aniket Corp account: ${otp}. Please do not share the otp with anyone`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error);
          res.status(500).json({ message: "Error sending email" });
        } else {
          console.log("Email sent: ", info.response);
          res.status(200).json({ message: "OTP for password regeneration sent to the user" });
        }
      });
}

export default ForgotPassword;