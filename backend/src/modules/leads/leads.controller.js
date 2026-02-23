const {createLead,getLead,getLeadById,updateLead,deleteLead}=require("./leads.service")

/**
 * Create CRM lead
 */
async function create(req,res){
    try{
        const userId=req.body.userId;
        const leadData=req.body;

        const lead = await createLead(leadData,userId)

        res.status(201).json({
            succcess:true,
            message:"Lead Created Successfully",
            data:lead
        })

    }catch(error){
        res.status(error.statusCode||500).json({
            success:false,
            message:error.message||"Server Error"
        })
    }
}
/**
 * Get leads list
 */
async function list(req,res){
    try{
        const leads = await getLead()
        res.status(201).json({
            success:true,
            data:leads,
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Failed to fetch leads"
        })
    }
}
/**
 * Get single lead by id
 */
async function getById(req,res){
    try{
        const lead = await getLeadById(req.params.id)
        if(!lead){
            return res.status(404).json({
                success:false,
                message:"Lead not Found"
            })
        }
        res.status(201).json({
            success:true,
            data:lead,
        })
    }catch(error){
        next(error)
    }

}
/**
 * Update lead
 */
async function update(req,res){
    try{
        const lead = await updateLead(
            req.params.id,
            req.body,
            req.user?._id  //later from auth
        )
        if(!lead){
            res.status(404).json({
                success:false,
                message:"Lead not found",
            })
        }
        res.status(201).json({
            success:true,
            message:"Lead Updated"
        })
    }catch(error){
            next(error)

    }
}
/**
 * Delete Lead
 */
async function leadDelete(req,res){
    try{    
        const lead = await deleteLead(req.params.id)
        if(!lead){
            res.status(404).json({
                success:false,
                message:"Lead not found"
            })
        }
        res.status(201).json({
                success:true,
                message:"Lead Deleted Successfully"  
        })

    }catch(error){
        next(error)
    }
}
module.exports={
    create,
    list,
    getById,
    update,
    leadDelete
}