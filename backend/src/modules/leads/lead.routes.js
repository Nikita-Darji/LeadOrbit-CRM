const express = require("express");
const router = express.Router();
const validateObjectId = require("../../middleware/validateObjectId");
const { protect } = require("../../middleware/auth.middleware");

const {
    create,
    list,
    getById,
    update,
    leadDelete
}=require("./leads.controller");

router.use(protect);

router.post("/",create);
router.get("/",list);
router.get("/:id",validateObjectId,getById);
router.put("/:id",validateObjectId,update);
router.delete("/:id",validateObjectId,leadDelete);
module.exports=router;
