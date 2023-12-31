const express = require("express");
const router = express.Router();
const {getAllUsersCtrl, 
      getUserProfileCtrl, 
      updateUserProfileCtrl,
       getUsersCountCtrl, 
       profilePhotoUploadCtrl} = require("../controllers/userController");
const { verifyTokenAndAdmin, verifyTokenAndOnlyUser, verifyToken } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");
const photoUpload = require("../middlewares/photoUpload");


// /api/users/profile
router.route("/profile")
      .get(verifyTokenAndAdmin,getAllUsersCtrl)

// /api/users/profile/:id
router.route("/profile/:id")
      .get(validateObjectId,getUserProfileCtrl)
      .put(validateObjectId,verifyTokenAndOnlyUser,updateUserProfileCtrl)

// /api/users/profile/profile-photo-upload
router.route("/profile/profile-photo-upload")
      .post(verifyToken,photoUpload.single("image"),profilePhotoUploadCtrl)


router.route("/count")
      .get(verifyTokenAndAdmin,getUsersCountCtrl)
module.exports = router