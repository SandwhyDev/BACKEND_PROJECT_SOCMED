import express from "express"
import ps from "../prisma/connection"
import form_data from "../services/form_service"
import { verify_jwt } from "../services/jwt_services"

const follow = express.Router()

follow.post("/follow_create", verify_jwt,form_data.none(),async(req,res)=>{
    try {
        const data = await req.body
        const result = await ps.follows.create({
            data : {
                follow_id : parseInt(data.follow_id),
                from_id : parseInt(data.from_id)
            }
        })
        res.json({
            success : true,
            msg : "berhasil follow",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

follow.get("/follow_read_all", async (req,res)=>{
    try {
        const result = await ps.follows.findMany()
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

follow.delete("/follow_delete", verify_jwt,form_data.none(), async (req,res)=>{
    try {
        const data = await req.body
        const result = await ps.follows.deleteMany({
            where : {
                follow_id : parseInt(data.follow_id),
                from_id : parseInt(data.from_id),
            }
        })

        res.json({
            success : true,
            msg : "berhasil unfollow",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})
export default follow