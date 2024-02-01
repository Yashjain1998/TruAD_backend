import mongoose,{ Schema } from "mongoose";


const User=new Schema({
    name: String,
    email: String,
    email: String,
});

export default mongoose.model.user || mongoose.model("user",User);
