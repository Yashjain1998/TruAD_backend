import Material from "../database/mongo_schema_material.js";
import User from "../database/mongo_schemar.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import aws from "aws-sdk";

dotenv.config();

aws.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.ACCESS_SECRET,
  region: process.env.REGION,
});

const s3 = new aws.S3();

const UploadMaterial = async (req, res) => {
  try {
    const token = req.token;

    const fileObj = JSON.parse(req.body.fileObj);

    const newMaterial = new Material(fileObj);
    const params = {
      Bucket: process.env.BUCKET,
      Key: req.file.originalname,
      Body: req.file.buffer,
    };

    const verifyToken = () => {
      return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    };

    const data = await verifyToken();
    const existingUser = await User.findOne({ email: data.email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    newMaterial.uploadedBy = existingUser._id;

    s3.upload(params, async (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error uploading file");
      }

      newMaterial.url = data.Location;

      try {
        await newMaterial.save();
        return res.status(200).json({ message: "File and material saved" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error saving material" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default UploadMaterial;
