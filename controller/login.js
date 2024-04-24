import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import User from "../database/mongo_schemar.js"
import dotenv from 'dotenv'

dotenv.config()

async function Login(req, res) {
    try {
      const { email, password, } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password);
  
      if (!isValidPassword) {
        return res.status(401).send('Invalid password');
      }

      if(!user.isVerified){
        return res.status(403).json({message: "Email not verified"})
      }
  
      const token = jwt.sign({ email, name: user.name }, process.env.SECRET, { expiresIn: '1h' });
      
      console.log("1", token)
      
      res.status(200).json({ token, username: user.name, email: user.email });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error logging in user');
    }
  };

  export default Login;