const path = require("path");
const multer = require("multer");


// Photo Storage
const photoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,path.join(__dirname,"../images"));
    },
    filename:(req,file,cb)=>{
        if(file){
            cb(null,new Date().toISOString().replace(/:/g,"-")+file.originalname)
            //.replace(/:/g,"-") because windows dont accecpt the file name have it 
        }else {
            cb(null,false);
        }
    }
})

// Photo Upload Middleware
const photoUpload = multer({
    storage :photoStorage,
    // filter the file to accept just {img} not .txt or pdf etc...
    fileFilter:function(req,file,cb){
        if(file.mimetype.startsWith("image")){
            cb(null,true)
        }else{
            cb({message:"Unsupported file format"},false)
        }
    },
    limits:{fileSize:1024 * 1024} // 1 megabyte
})

module.exports = photoUpload;