import Material from '../database/mongo_schema_material.js'
async function GetMaterial(req, res){
try {
    const materials = await Material.find();
    res.status(200).json({materials})
} catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
}
}
;
export default GetMaterial