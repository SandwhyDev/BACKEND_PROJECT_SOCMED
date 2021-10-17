import express from "express"
import path from "path"
import ps from "../prisma/connection"
import form_data from "../services/form_service"
import { verify_jwt } from "../services/jwt_services"
import upload_photo_post from "../services/multer_post"

const post = express.Router()


post.post("/post_create", verify_jwt,upload_photo_post.single("post_photo"), async (req,res)=>{
    try {
        const data = await req.body
        const file = await req.file
        const result = await ps.post.create({
            data : {
                title : data.title,
                body : data.body,
                post_photo : {
                    create : {
                        filename : file.filename,
                        image_path : path.join(__dirname, `/uploads/post/${file.filename}`),
                    }
                },
                user_id : parseInt(data.user_id)
               
            }
        })

        res.json({
            success : true,
            msg : "berhasil upload post",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

post.get("/post_read_all", async(req,res)=>{
    try {
        const result = await ps.post.findMany({
            include : {
                post_photo : true,
                like : true,
                comment : true,
                reply : true,
                
            }
        })
        res.json({
            success : true,
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

post.put("/post_update/:id", verify_jwt,form_data.none(),async (req,res)=>{
    try {
        const {id} = await req.params
        const data = await req.body
        const result = await ps.post.update({
            where : {
                id : parseInt(id)
            },
            data : {
                title : data.title,
                body : data.body,
                user_id : parseInt(data.user_id)
            }
        })

        res.json({
            success : true,
            msg : "berhasil update post",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

post.delete("/post_delete/:id", verify_jwt,async(req,res)=>{
    try {

        const {id} = await req.params

        const result = await ps.post.delete({
            where : {
                id   : parseInt(id),
                
            }
        })

        res.json({
            success : true,
            msg : "berhasil delete post",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})



export default post