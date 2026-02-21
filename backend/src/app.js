const express = require("express")
const cors=require("cors")

const authRoutes= require('./modules/auth/route')
const app = express();

//Middleware
app.use(cors())
app.use(express.json())

//Routes
app.use('/auth',authRoutes)

app.get('/',(req,res)=>{
    res.send("CRM API running")
});

module.exports=app
