const exprees = require("express")
const router = exprees.Router()
const validateObjectId= require("../../middleware/validateObjectId")

const {
    create,
    list,
    getById,
    update,
    leadDelete
}=require("./leads.controller")

router.post("/",create)
router.get("/",list)
router.get("/:id",validateObjectId,getById)
router.put("/:id",validateObjectId,update)
router.delete("/:id",validateObjectId,leadDelete)
module.exports=router;
