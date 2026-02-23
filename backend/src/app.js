const express = require("express")
const cors=require("cors")

const authRoutes= require('./modules/auth/auth.route')
const leadRoutes= require('./modules/leads/lead.routes')
const errorHandler=require('./middleware/errorHandler')
const app = express();

//Middleware
app.use(cors())
app.use(express.json())

//Routes
app.use('/auth',authRoutes)
app.use('/leads',leadRoutes)

app.get('/',(req,res)=>{
    res.send("CRM API running")
});

app.use(errorHandler)

module.exports=app
