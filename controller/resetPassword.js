import User from "../database/mongo_schemar.js"
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

dotenv.config()

async function ResetPassword(req, res) {
    const token = req.token;
    const { newPassword } = req.body
    const verifyToken = () => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET, (err, data) => {
                if(err){
                    reject(err)
                } else{
                    resolve(data)
                }
            })
        })
    }

    const data = await verifyToken()

    const email = data.email;

    const existingUser = await User.findOne({email})

    if(!existingUser){
        return res.status(404).json({message: "User does not exist"})
    }

    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain at least one special character, one uppercase character, and one number.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await existingUser.updateOne({password: hashedPassword});

    res.status(200).json({message: "Password has been updated"})
}

export default ResetPassword;