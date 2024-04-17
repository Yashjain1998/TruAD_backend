import mongoose from "mongoose";
import User from "./mongo_schemar.js"
import generateUniqueId from "../helper_function/generate_unique_id.js"

const { Schema } = mongoose;

const RaiseTicketSchema = new Schema(
  {
    user_email: {
      type: String,
      // Ensure that a User ID must be provided when creating a ticket
    },
    // ticketId: {
    //   type: String,
    //   unique: true,
    //   default: () => generateUniqueId('T', 5), // Set default using a function to generate the ID
    // },
    subject: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["In Progress", "On Hold", "Resolve"],
      default: "In Progress",
    },
    supportTeam: {
      type: String,
      enum: [
        "IT Department",
        "HR Department",
        "Sales And Marketing Department",
        "Account Department",
      ],
      default:'IT Department',
    },
    viewImage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true, // This enables the automatic handling of createdAt and updatedAt fields
  }
);

// Middleware to handle cascading delete
RaiseTicketSchema.pre('save', function(next) {
  if (!this.TicketId) { // Check if the TicketId is not already set
    this.TicketId = generateUniqueId('T', 5);
  }
  next();
});

RaiseTicketSchema.pre('findOneAndDelete', async function(next) {
  const TicketId = this.getQuery()['_id'];
  await User.updateMany(
    { raiseTicket: TicketId },
    { $pull: { raiseTicket: TicketId } }
  );
  next();
});
// Check if the model exists to prevent overwriting it. Use 'raiseTicket' as the model name.
const RaiseTicket =
  mongoose.models.raiseTicket ||
  mongoose.model("raiseTicket", RaiseTicketSchema);

export default RaiseTicket;
