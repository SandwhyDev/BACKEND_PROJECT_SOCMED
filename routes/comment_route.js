import express from "express"
import ps from "../prisma/connection"
import form_data from "../services/form_service"
import { verify_jwt } from "../services/jwt_services"

const comment = express.Router()


comment.post("/comment_create", verify_jwt,form_data.none(),async(req,res)=>{
    try {
        const data = await req.body
        const result = await ps.comment.create({
            data : {
                body : data.body,
                post_id : parseInt(data.post_id),
                from_id : parseInt(data.from_id)
            }
        })

        res.json({
            success : true,
            msg : "berhasil comment",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

comment.get("/comment_read_all", async(req,res)=>{
    try {
        const result = await ps.comment.findMany({
            include : {
                reply : true
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

comment.put("/comment_update/:id",verify_jwt,form_data.none(), async (req,res)=>{
    try {
        const {id} = await req.params
        const data = await req.body
        const result = await ps.comment.update({
            where : {
                id : parseInt(id)
            },
            data : {
                body : data.body,
                post_id : parseInt(data.post_id),
                // from_id : parseInt(data.from_id)
            }
        })

        res.json({
            success : true,
            msg : "berhasil update comment",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

comment.delete("/comment_delete/:id",verify_jwt ,async (req,res)=>{
    try {
        const {id} = await req.params
        // const data = await req.body
        const result = await ps.comment.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.json({
            success : true,
            msg : "berhasil delete comment",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})



export default comment