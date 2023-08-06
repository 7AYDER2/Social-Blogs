const jwt = require("jsonwebtoken");

// Verify Token 
function verifyToken(req,res,next){
    const auttoken = req.headers.authorization;
    if(auttoken) {
      const token = auttoken.split(" ")[1];
      try {
        const decodedPayload = jwt.verify(token,process.env.SECRETKEY);
        req.user = decodedPayload;
        next();
      }catch(error){
        return res.status(401).json({message:"invalid token"})
      }
    }else{
      return res.status(401).json({message:"no token provided"})
    }
}

// verify token and admin
function verifyTokenAndAdmin(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else {
            return res.status(403).json({message:"not allowed, only admin"});
        }
    })
}

// verify token & only user himself
function verifyTokenAndOnlyUser(req,res,next){
  verifyToken(req,res,()=>{
      if(req.user.id === req.params.id){
          next();
      }else {
          return res.status(403).json({message:"not allowed, only user himself"});
      }
  })
}

module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndOnlyUser
}