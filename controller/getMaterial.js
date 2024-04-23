import Material from '../database/mongo_schema_material.js'
async function GetMaterial(req, res){
    const materials = await Material.find();
    res.status(200).json({materials})
}

export default GetMaterial