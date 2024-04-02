import mongoose from "mongoose";
import User from "./mongo_schema.js"

const { Schema } = mongoose;

const RaiseTicketSchema = new Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["In Progress", "On Hold", "Completed"],
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
