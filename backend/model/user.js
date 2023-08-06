const mongoose = require("mongoose");


// User Schema
const  UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:100
    },
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:100,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8,
    },
    profilePhoto:{
        type:Object,
        default:{
            url:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            publicId:null
        }
    },
    bio:{
        type:String,
    },
   isAdmin:{
    type:Boolean,
    default:false
   },
   isAccountVerified:{
    type:Boolean,
    default:false
   }
},{
    timestamps : true // adds createdAt and updatedAt to the schema
})



// User Model
const User = mongoose.model("User",UserSchema);


module.exports = {
    User
}