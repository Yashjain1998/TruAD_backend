import mongoose, { Schema } from "mongoose";
import RaiseTicket from './mongo_schema_raiseTicket.js'

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: false,
  },
  raiseTicket: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'raiseTicket',
      default: [],
    },
  ],
  isVerified: {
    type: Boolean,
    required: true,
  },
});

User.pre('remove', async function(next) {
  const {raiseTicket} = this;
  await RaiseTicket.deleteMany({
    _id: { $in: raiseTicket }
  });
  next();
});


export default mongoose.model.user || mongoose.model("user", User);
