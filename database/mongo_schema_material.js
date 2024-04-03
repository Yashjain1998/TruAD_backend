import mongoose from "mongoose";

const materialSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date:  {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Material', materialSchema)