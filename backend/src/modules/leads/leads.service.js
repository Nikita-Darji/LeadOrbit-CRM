const Lead = require("./leads.model");

/**
 * Create a new CRM lead
 */
async function createLead(data,userId){
    const lead = await Lead.create({
        ...data,
        owner:userId,
        createdBy:userId
    })
    return lead
}
/**
 * Get leads list (basic fetch)
 */
async function getLead(){
    const leads = await Lead.find()
    .populate("owner","name email role")
    .sort({createdAt:-1})

    return leads
}
/**
 * Get single lead by id
 */
async function getLeadById(id){
    const lead= await Lead.findById(id)
    .populate("owner","name email")
    .populate("createdBy","name email")
    .populate("updatedBy","name Email")

    return lead;
}
/**
 * Update lead
 */
async function updateLead(id,data,userid){
    const lead = await Lead.findByIdAndUpdate(
        id,
        {...data,
        updatedBy:userid,
    },
    {new:true} 
    )
    .populate("owner","name email role")
    .populate("createdBy","name email")
    .populate("updatedBy","name email")

    return lead
}
/**
 * Delete lead
 */
async function deleteLead(id){
    const lead = await Lead.findByIdAndDelete(id)
    return lead
} 
module.exports={
    createLead,
    getLead,
    getLeadById,
    updateLead,
    deleteLead
}
