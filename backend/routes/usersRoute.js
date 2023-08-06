const express = require("express");
const router = express.Router();
const {getAllUsersCtrl, getUserProfileCtrl, updateUserProfileCtrl, getUsersCountCtrl} = require("../controllers/userController");
const { verifyTokenAndAdmin, verifyTokenAndOnlyUser } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId")


// /api/users/profile
router.route("/profile")
      .get(verifyTokenAndAdmin,getAllUsersCtrl)

// /api/users/profile/:id
router.route("/profile/:id")
      .get(validateObjectId,getUserProfileCtrl)
      .put(validateObjectId,verifyTokenAndOnlyUser,updateUserProfileCtrl)

router.route("/count")
      .get(verifyTokenAndAdmin,getUsersCountCtrl)
module.exports = router