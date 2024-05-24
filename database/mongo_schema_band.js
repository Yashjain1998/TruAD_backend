import mongoose from "mongoose";

const BandSchema = mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    createdAt: { 
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Band", BandSchema);