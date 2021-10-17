import express from "express"
import ps from "../prisma/connection"
import form_data from "../services/form_service"
import { verify_jwt } from "../services/jwt_services"

const reply = express.Router()



reply.post("/reply_create", verify_jwt,form_data.none(), async(req,res)=>{
    try {
        const data = await req.body
        const result = await ps.reply.create({
            data : {
                body : data.body,
                post_id : parseInt(data.post_id),
                comment_id : parseInt(data.comment_id),
                from_id : parseInt(data.from_id)

            }
        })

        res.json({
            success : true,
            msg : "berhasil reply",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

reply.get("/reply_read_all", async(req,res)=>{
    try {
        const result = await ps.reply.findMany()
        res.json({
            success : true,
            query :  result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

reply.put("/reply_update/:id", verify_jwt,form_data.none(), async(req,res)=>{
    try {
        const {id} = await req.params
        const data = await req.body
        const result = await ps.reply.update({
            where : {
                id : parseInt(id)
            },
            data : {
                body : data.body,
                post_id : parseInt(data.post_id),
                comment_id : parseInt(data.comment_id),
                from_id : parseInt(data.from_id)
            }
        })

        res.json({
            success : true,
            msg : "berhasil update reply",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

reply.delete("/reply_delete/:id", verify_jwt ,async(req,res)=>{
    try {
        const {id} = await req.params
        const result = await ps.reply.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.json({
            success : true,
            msg : "berhasil delete reply",
            query : result
        })
    } catch (error) {
        res.json({
            success : true,
            error : error.message
        })
    }
})

export default reply