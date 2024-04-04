import User from "../database/mongo_schema.js";

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({email:req.user.email}).populate("raiseTicket");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Sending just the array of tickets. Adjust if you need to include more user info.
    res.status(200).json({
      user: user, // Assuming raiseTicket is the correct field name
    });
  } catch (error) {
    console.error(error); // It's a good practice to log the actual error
    res.status(500).json({ message: "Error retrieving user tickets" });
  }
};  

  const editUserById = async (req, res) => {
    try {
      const email = req.params.user_email; // Assuming the user ID comes from the URL
      const updates = req.body; // Contains fields to update
      const updatedUser = await User.findOneAndUpdate({email}, updates, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating user" });
    }
  };

  
  const deleteUserById = async (req, res) => {
    try {
      const email = req.params.user_email;
      const deletedUser = await User.findOneAndDelete(email);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting user" });
    }
  };

  
  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving users" });
    }
  };
  

export { getUserById, editUserById, deleteUserById, getAllUsers };
