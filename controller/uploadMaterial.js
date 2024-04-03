import Material from '../database/mongo_schema_material.js'
import User from "../database/mongo_schemar.js"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const UploadMaterial = async (req, res) => {
    try {
        const {material} = req.body;

        console.log(material)

        const token = req.token 

        console.log("token", token);

        const verifyToken = () => {
            return new Promise((resolve, reject) => {
                jwt.verify(token, 'secretkey', (err, data) => {
                    if(err){
                        reject(err)
                    } else{
                        resolve(data)
                    }
                })
            })
        }

        const data = await verifyToken();

        const existingUser = await User.findOne({email: data.email})

        if(!existingUser){
            return res.status(404).json({message: "User not found"})
        }

        console.log(existingUser)

        material.uploadedBy = existingUser._id;

        console.log(material)

        const newMaterial = new Material(material);
    
        await newMaterial.save()
    
        res.status(200).json({message: "New Material Saved"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export default UploadMaterial