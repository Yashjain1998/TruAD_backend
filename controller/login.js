import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import User from "../database/mongo_schemar.js"

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
  
      const token = jwt.sign({ email, name: user.name }, 'secretkey', { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error logging in user');
    }
  };

  export default Login;