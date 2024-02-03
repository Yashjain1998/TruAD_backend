import mongoose from "mongoose";
function mongodb() {
  
  const mongoURI = ``;
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
