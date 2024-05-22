import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema({
    title: {
        type : String,
        required: true
    },
    clip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    },
    createdAt: { 
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Notification", NotificationSchema);