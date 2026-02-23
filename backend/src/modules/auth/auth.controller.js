const {registerUser} =require("./auth.service")

//Handle user registration request

async function register(req,res){   
    try{
        const userData = req.body;

        const user = await registerUser(userData)

        res.status(201).json({
            success:true,
            message:"User Registered Successfully",
            data:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            }
        });
    }catch(error){
            next(error)
    }

}

module.exports={
    register,
};