import mongoose,{ Schema } from "mongoose";


const Video=new Schema({
    name: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    materialID: {
        type: String,
        required: true
    }
});

export default mongoose.model("video", Video);