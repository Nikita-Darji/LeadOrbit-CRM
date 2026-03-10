const {createLead,getLead,getLeadById,updateLead,deleteLead}=require("./leads.service")

/**
 * Create CRM lead
 */
async function create(req,res,next){
    try{
        const userId=req.user._id;
        const leadData=req.body;

        const lead = await createLead(leadData,userId)

        res.status(201).json({
            success:true,
            message:"Lead Created Successfully",
            data:lead
        });

    }catch(error){
        next(error);
    }
}
/**
 * Get leads list
 */
async function list(req,res,next){
    try{
        const leads = await getLead()
        res.status(200).json({
            success:true,
            data:leads,
        });
    }catch(error){
        next(error);
    }
}
/**
 * Get single lead by id
 */
async function getById(req,res,next){
    try{
        const lead = await getLeadById(req.params.id)
        if(!lead){
            return res.status(404).json({
                success:false,
                message:"Lead not Found"
            })
        }
        res.status(200).json({
            success:true,
            data:lead,
        });
    }catch(error){
        next(error);
    }

}
/**
 * Update lead
 */
async function update(req,res,next){
    try{
        const lead = await updateLead(
            req.params.id,
            req.body,
            req.user._id
        );
        if(!lead){
            return res.status(404).json({
                success:false,
                message:"Lead not found",
            });
        }
        res.status(200).json({
            success:true,
            message:"Lead Updated",
            data:lead,
        });
    }catch(error){
            next(error);

    }
}
/**
 * Delete Lead
 */
async function leadDelete(req,res,next){
    try{    
        const lead = await deleteLead(req.params.id)
        if(!lead){
            return res.status(404).json({
                success:false,
                message:"Lead not found"
            })
        }
        res.status(200).json({
                success:true,
                message:"Lead Deleted Successfully"  
        });

    }catch(error){
        next(error);
    }
}
module.exports={
    create,
    list,
    getById,
    update,
    leadDelete
}
