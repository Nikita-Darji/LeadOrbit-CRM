const mongoose = require("mongoose")

function validateObject (req,res,next){
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({
            status:false,
            message:"Invalid ID format"
        })
    }
    next()
}
module.exports=validateObject