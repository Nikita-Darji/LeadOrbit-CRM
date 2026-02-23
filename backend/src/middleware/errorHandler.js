module.exports=(err,req,res,next)=>{
    console.log(err) //server
    res.status(err.status||500).json({
        success:false,
        message:err.message||"server Error"
    })
}