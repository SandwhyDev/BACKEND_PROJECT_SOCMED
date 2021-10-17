import multer from "multer";
import path from "path"


const upload_storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, path.join(__dirname, "../static/uploads/avatar"))
    },
    filename : function (req,file,cb){
        cb(null, file.originalname)
    }
})

const upload_avatar = multer({storage : upload_storage})

export default upload_avatar