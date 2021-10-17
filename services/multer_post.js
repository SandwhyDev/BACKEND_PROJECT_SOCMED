import multer from "multer";
import path from "path"

const uploadPostStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, path.join(__dirname, `../static/uploads/post`))
    },
    filename : function(req,file,cb){
        cb(null, file.originalname)
    }
})

const upload_photo_post = multer({storage : uploadPostStorage})

export default upload_photo_post