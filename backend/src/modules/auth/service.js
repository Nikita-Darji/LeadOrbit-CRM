const bcrypt = require("bcryptjs")
const User = require("../users/users.model");

async function registerUser(data){
    const {name,email,password,role} = data

    // Check if email already exists
    const existingUser= await User.findOne({email});
    if(existingUser){
        const error= new Error("Email Already Registered")
        error.statusCode=409;
        throw error;
    }

    //Hashed password
    const hashedPassword = await bcrypt.hash(password,10)

    //create user in Database
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        role,
    })
    return user;

}
module.exports={registerUser}