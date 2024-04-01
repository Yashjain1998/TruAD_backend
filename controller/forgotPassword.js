import User from "../database/mongo_schemar.js"
import { generateRandomOTP } from "../utils/index.js"
import OTP from "../database/mongo_schema_OTP.js"
import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: "aniketmukherjee5@gmail.com",
//       pass: process.env.MAILER_KEY,
//     },
// });  

let transporter = nodemailer.createTransport({
    host: 'mail.truad.co', // Replace with your actual SMTP host
    port: 465, // or 465 (usually 587 for STARTTLS, 465 for SSL)
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'noreply@truad.co', // your email address
        pass: process.env.TRUAD_MAILER // your email password
    }
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
        from: "noreply@truad.co",
        to: email,
        subject: "OTP for Password Regenaration",
        text: `Please use the following OTP to regenerate the passoword for your TruAd account: ${otp}. Please do not share the otp with anyone`
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