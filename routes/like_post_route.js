import express from "express"
import ps from "../prisma/connection"
import form_data from "../services/form_service"
import { verify_jwt } from "../services/jwt_services"

const like_post = express.Router()

like_post.post("/like_post_create", verify_jwt,form_data.none(), async(req,res)=>{
    try {
        
        const data = await req.body
        const result = await ps.like.create({
            data : {
                
                post_id : parseInt(data.post_id),
                from_id : parseInt(data.from_id),
            }
        })

        res.json({
            success : true,
            msg : "berhasil like post",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

like_post.get("/like_post_read_all",async(req,res)=>{
    try {
        // const data = await req.body
        const result = await ps.like.findMany()
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

like_post.get("/like_post_read_unique/:id",async(req,res)=>{
    try {
        const {id} = await req.params
        // const data = await req.body
        const result = await ps.like.findUnique({
            where : {
                id : parseInt(id)
            },
            
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

like_post.delete("/like_post_delete/:id", verify_jwt,form_data.none(), async(req,res)=>{
    try {
        const {id} = await req.params
        const data = await req.body

        const result = await ps.like.deleteMany({

            where : {
                id : parseInt(id),
                post_id : parseInt(data.post_id),
                from_id : parseInt(data.from_id),
            },
            
        })

        res.json({
            success : true,
            msg : "berhasil hapus like post",
            query : result
        })

    } catch (error) {

        res.json({
            success : false,
            error : error.message
        })

    }
})

export default like_post