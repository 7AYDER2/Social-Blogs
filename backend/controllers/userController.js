const asyncHandler = require("express-async-handler");
const {User} = require("../model/user");
const { validateUpdateUser } = require("../helpers/ValidateUser");
const bcrypt = require("bcryptjs")



/**
* @desc     Get All users Profile
* @router   /api/users/profile
* @method   GET
* @access   private (only admin)
*/

module.exports.getAllUsersCtrl = asyncHandler(async(req,res)=>{
    const usersProfile= await User.find({}).select("-password");
    res.status(200).json(usersProfile)
}) 

/**
 * @desc   Get Single user Profile
 * @router   /api/user/profile/:
 * @method   GET
 * @access   public
 */

module.exports.getUserProfileCtrl = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id).select("-password");
    if(!user) {
        return res.status(404).json({message:"user not found"})
    }
    res.status(200).json(user)
})

/**
 *  @desc    Update User profile
 *  @router  /api/user/profile/:id
 *  @method  put
 *  @access  private (only user himself)
 */

module.exports.updateUserProfileCtrl = asyncHandler(async(req,res)=>{

    // validate 
    const {error} = validateUpdateUser(req.body)
    if(error) {
        return res.status(400).json({message:error.details[0].message})
    }

    if(req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password =await bcrypt.hash(req.body.password,salt)
    } 

    const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set:{
            username:req.body.username,
            password:req.body.password,
            bio:req.body.bio
        }
    },{new:true}).select("-password");//return the new object without password

    res.status(200).json(updatedUser)
})

/**
* @desc     Get All Users Count
* @router   /api/users/profile
* @method   GET
* @access   private (only admin)
*/

module.exports.getUsersCountCtrl = asyncHandler(async(req,res)=>{
    const count= await User.count()
    res.status(200).json(count)
}) 


/**
* @desc     Profile Photo Upload
* @router   /api/users/profile/profile-photo-upload
* @method   post
* @access   private (only logged in users)
*/
module.exports.profilePhotoUploadCtrl = asyncHandler(async(req,res)=>{
    if(req.file){
        return res.status(400).json({message:"no file provider"})
    }
    res.status(200).json({message:"your profile photo uploaded successfully"})
});
