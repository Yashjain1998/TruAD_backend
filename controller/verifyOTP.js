import OTP from "../database/mongo_schema_OTP.js"
import User from "../database/mongo_schemar.js"
import jwt from 'jsonwebtoken'

async function VerifyOTP(req, res){
    try {
        const {email, otp} = req.body;

        console.log(email, parseInt(otp))
    
        const existingUser = await User.findOne({email})
    
        console.log(existingUser.email)
    
        if(!existingUser){
            return res.status(404).json({message: "User does not exist"})
        }
    
        const existingOTP = await OTP.findOne({user: existingUser._id})
    
        if(existingOTP.otp != parseInt(otp)){
            return res.status(403).json({message: "Unauthorized"})
        }
    
        await existingOTP.deleteOne();
    
        const token = jwt.sign(
            { email},
            process.env.SECRET,
            { expiresIn: "1h" }
          );
    
        res.status(200).json({message: "Sucesss", token})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export default VerifyOTP