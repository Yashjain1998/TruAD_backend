import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
function mongodb() {
  
  // const mongoURI = `mongodb+srv://blogChefUser:${process.env.MONGO_KEY}@cluster0.pq0gbfi.mongodb.net/?retryWrites=true&w=majority`;

  const mongoURI = `mongodb+srv://mangeshsonje:${process.env.MONGO_KEY}@cluster0.yk2254y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  // const mongoURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_KEY}@cluster0.duvmrrh.mongodb.net/`;
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