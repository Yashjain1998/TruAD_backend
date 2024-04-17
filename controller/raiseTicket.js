import User from '../database/mongo_schemar.js';
import RaiseTicket from '../database/mongo_schema_raiseTicket.js';
// Controller to get tickets for a user
// Placeholder for UserTickets function
const createTickets = async (req, res) => {
  // Function implementation goes here
  try {
    // Check if the author exists
    const user = await User.findOne({email: req.params.user_email}).populate('raiseTicket');
    const{subject, status, supportTeam, viewImage}=req.body
    if (!user) {
      return res.status(404).json({ message: "Author not found" });
    }
    // Create a new book
    const raiseTicket = new RaiseTicket({
      subject: subject,
      status: status,
      supportTeam: supportTeam,
      viewImage: viewImage,
      // other book fields as needed
    });
    // Save the new book to the database
    const Ticket = await raiseTicket.save();
    

    // Add the book to the author's list of books
    user.raiseTicket.push(raiseTicket._id);
    await user.save();

    // Respond with the newly added book
    res.status(201).json(Ticket);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Error adding book to author" });
  }

};

const deleteTicketById = async (req, res) => { 
  try {
    const id=req.params.ticketId
    const Tickets = await RaiseTicket.findByIdAndDelete(id);
    if (!Tickets) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      tickets: Tickets // Assuming raiseTicket is the correct field name
    });
  } catch (error) {
    console.error('Error deleting the tecket:', error);
    throw error; // Or handle the error as needed
  }
};

const getTicketsById= async (req, res)=>{
  try {
    const Tickets = await RaiseTicket.findById(req.params.ticketId);
    if (!Tickets) {
      return res.status(404).json({ message: "User not found" });
    }
    // Sending just the array of tickets. Adjust if you need to include more user info.
    return res.status(200).json({
      tickets: Tickets // Assuming raiseTicket is the correct field name
    });
  } catch (error) {
    console.error(error); // It's a good practice to log the actual error
    res.status(500).json({ message: "Error retrieving user tickets" });
  }
}
const getAllTickets= async (req, res)=>{
  try {
    const Tickets = await RaiseTicket.find();
    if (!Tickets) {
      return res.status(404).json({ message: "User not found" });
    }
    // Sending just the array of tickets. Adjust if you need to include more user info.
    res.status(200).json({
      tickets: Tickets // Assuming raiseTicket is the correct field name
    });
  } catch (error) {
    console.error(error); // It's a good practice to log the actual error
    res.status(500).json({ message: "Error retrieving user tickets" });
  }
}
const editTicketsById = async (req, res) => {
  try {
    const { subject, status, supportTeam, viewImage } = req.body;
    // Assuming the ticket ID is passed as a URL parameter
    const ticketId = req.params.ticketId;

    // Find the ticket by ID and update it with new values from req.body
    const updatedTicket = await RaiseTicket.findByIdAndUpdate(
      ticketId,
      { $set: { subject, status, supportTeam, viewImage } },
      { new: true } // Return the updated document
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Sending back the updated ticket
    res.status(200).json(updatedTicket);
  } catch (error) {
    console.error(error); // It's a good practice to log the actual error
    res.status(500).json({ message: "Error updating the ticket" });
  }
};

const postreq= async (req, res)=>{
  try {
    const raiseTicket = new RaiseTicket({
      subject: "abc",
      viewImage: 'uytyesr',
      userId:"660bcc757c37afb58a21c486",
      // other book fields as needed
    });
    const ticket=await raiseTicket.save();
    res.status(201).json(ticket)
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: "Error adding book to author" });
  }
}

// Correctly export both functions using named exports
export {createTickets, getAllTickets, getTicketsById, editTicketsById, deleteTicketById, postreq};
