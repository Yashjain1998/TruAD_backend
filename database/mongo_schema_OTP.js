import mongoose from "mongoose";

const OPTSchema = mongoose.Schema({
    otp : {
        type: Number,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
})

export default mongoose.model("OTP", OPTSchema)