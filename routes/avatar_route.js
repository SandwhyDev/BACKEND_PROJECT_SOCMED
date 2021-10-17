import express from "express"
import path from "path"
import ps from "../prisma/connection"
import upload_avatar from "../services/multer_avatar"

const avatar = express.Router()

avatar.post("/avatar_create", upload_avatar.single("avatar"), async (req,res)=>{
    try {
        const data = await req.body

        const file = await req.file

        const result = await ps.avatar.create({

            data : {
                image_path : path.join(__dirname, `/static/uploads/avatar`),
                filename : file.filename,
                user_id : parseInt(data.user_id)
            }
        })

        res.json({
            success : true,
            msg : "berhasil buat avatar",
            query : result
        })

    } catch (error) {

        res.json({
            success : false,
            error : error.message
        })

    }
})

avatar.get("/avatar_read_all", async(req,res)=>{
    try {
        const result = await ps.avatar.findMany()

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

avatar.put("/avatar_update/:id", upload_avatar.single("avatar"), async (req,res)=>{
    try {
        const {id} = await req.params
        const file = await req.file

        const data = await req.body
        
        const result = await ps.avatar.update({

            where : {
                id : parseInt(id)
            },
            data : {
                image_path : path.join(__dirname, `/static.uploads/avatar`),
                filename : file.filename,
                user_id : parseInt(data.user_id)
            }

        })

        res.json({
            success : true,
            msg : "berhasil update avatar",
            query : result
        })

    } catch (error) {

        res.json({
            success : false,
            error : error.message
        })

    }
})

avatar.delete("/avatar_delete/:id", async(req,res)=>{
    try {
        const {id} = await req.params
        
        const result = await ps.avatar.delete({
            where : {
                id  : parseInt(id)
            }
        })

        res.json({
            success : true,
            msg : "berhasil delete avatar",
            query : result
        })

    } catch (error) {

        res.json({
            success : false,
            error : error.message
        })

    }
})
export default avatar