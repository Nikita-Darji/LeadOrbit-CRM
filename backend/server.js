require("dotenv").config()

const app = require("./src/app")
const connectdb=require("./src/config/db")

const PORT = process.env.PORT || 5000
async function startServer(){
    await connectdb()
}

app.listen(PORT,()=>{
    console.log(`Server Connected on Port ${PORT}`);
})

startServer();