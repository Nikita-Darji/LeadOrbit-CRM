const { registerUser, loginUser } = require("./auth.service");
const { signToken } = require("../../utils/jwt");

//Handle user registration request

async function register(req,res,next){   
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
/**
 * Login
 */
async function login(req,res,next){
    try{
        const user = await loginUser(req.body.email,req.body.password);
        const token = signToken(user);

        res.status(200).json({
            success:true,
            data:{
                token,
                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role,
                    isActive:user.isActive,
                }
            }
        });
    }
    catch(error){
        next(error)
    }
}


module.exports={
    register,login
};
