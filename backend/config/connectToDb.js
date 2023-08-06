const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()
// connect to database 

module.exports = async ()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connect to DB")
  }catch(error){
    console.log("Connections Failed To MongoDB")
  }
}