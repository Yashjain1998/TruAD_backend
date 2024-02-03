import bcrypt from "bcrypt";
import User from "../database/mongo_schemar.js";

async function Register(req, res) {
  try {
    const { name, password, email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      password: hashedPassword,
      email,
    });

    await newUser.save();
    res.status(200).send('Success');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error registering user');
  }
}

export default Register;
