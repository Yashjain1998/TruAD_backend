import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
function mongodb() {
  
  const mongoURI = `mongodb+srv://blogChefUser:${process.env.MONGO_KEY}@cluster0.pq0gbfi.mongodb.net/?retryWrites=true&w=majority`;

  // const mongoURI = ``;
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
}

export default mongodb;
