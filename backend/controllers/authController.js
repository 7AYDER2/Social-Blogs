const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {User } =require("../model/user")
const {validateRegisterUser,validateLoginUser} = require("../helpers/ValidateUser")
const jwt = require('jsonwebtoken');

/**
* @desc     Register New User
* @router   /api/auth/register
* @method   POST
* @access   public
*/
module.exports.registerUserCtrl = asyncHandler(async(req,res)=>{
const {error} = validateRegisterUser(req.body)

if(error){
    res.status(400).json({message:error.details[0].message})
}

let user = await User.findOne({email:req.body.email});
if(user) {
    return res.status(400).json({message:"User already exsits"})
}
   
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password,salt)

   user = new User({
    username : req.body.username,
    email :  req.body.email,
    password:hashedPassword
   })
   await user.save()

    // @TODO - sending email (verify account )


   res.status(201).json("register successfully, Please log in")
})

/**
* @desc     Login User
* @router   /api/auth/Login
* @method   POST
* @access   public
*/

module.exports.loginUserCtrl = asyncHandler(async(req,res)=>{

  const {error } = validateLoginUser(req.body)
  if(error) {
    return res.status(400).json({message:error.details[0].message})
  }

  const user = await User.findOne({email:req.body.email})
  if(!user) {
    return res.status(400).json({message:"Invalid email password"});
 }
  
 const validPassowrd= await bcrypt.compare(req.body.password,user.password)

 if(!validPassowrd){
    return res.status(404).json({message:"Unable to authenticate, password is incorect"})
 }

 // @TODO - sending email (verify account if not verified)

 const token = jwt.sign({id:user.id,isAdmin:user.isAdmin},process.env.SECRETKEY)

 res.status(200).json({message:"Authentecated",
 _id:user._id,
 isAdmin:user.isAdmin,
 profilePhoto:user.profilePhoto
 ,token})
})