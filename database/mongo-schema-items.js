import mongoose from "mongoose";
import Video from "./mongo_schema_video.js"

const itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Video
    },
    location:{
        type: String,
        required: true
    }
})

export default mongoose.model("Item", itemSchema)