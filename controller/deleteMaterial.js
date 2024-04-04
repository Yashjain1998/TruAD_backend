import Material from '../database/mongo_schema_material.js';

async function DeleteMaterial(req, res){
    try {
        const {materialID} = req.body;

        const existingMaterial = await Material.findOne({_id: materialID})
    
        if(!existingMaterial){
            return res.status(404).json({message: "Material not found"})
        }
    
        await existingMaterial.deleteOne()
    
        res.status(200).json({message: "Material Successfully Deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"})
    }
}

export default DeleteMaterial