import express from "express"
import ps from "../prisma/connection"
import form_data from "../services/form_service"
import { verify_jwt } from "../services/jwt_services"

const biodata = express.Router()

biodata.post("/biodata_create",verify_jwt ,form_data.none(), async(req,res)=>{
    try {
        const data = await req.body
        const result = await ps.biodata.create({
            data : {
                nama_lengkap : data.nama_lengkap,
                alamat : data.alamat,
                telp : parseInt(data.telp),
                jenis_kelamin : data.jenis_kelamin,
                pendidikan : data.pendidikan,
                user_id : parseInt(data.user_id)

            }
        })
        res.json({
            success : true,
            msg : "berhasil buat biodata",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

biodata.get("/biodata_read_all", async (req,res)=>{
    try {
        const result = await ps.biodata.findMany()
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

biodata.put("/biodata_update/:id", verify_jwt,form_data.none(), async (req,res)=>{
    try {
        const {id} = await req.params

        const data = await req.body

        const result = await ps.biodata.update({

            where :{
                id : parseInt(id)
            },
            data : {
                nama_lengkap : data.nama_lengkap,
                alamat : data.alamat,
                telp : parseInt(data.telp),
                jenis_kelamin : data.jenis_kelamin,
                pendidikan : data.pendidikan,
                user_id : parseInt(data.user_id)
            }
        })

        res.json({
            success : true,
            msg : "berhasil update biodata",
            query : result
        })

    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

biodata.delete("/biodata_delete/:id", verify_jwt,async(req,res)=>{
    try {
        const {id} = await req.params
        const result = await ps.biodata.delete({
            where : {
                id : parseInt(id)
            }
        })

        res.json({
            success : true,
            msg : "berhasil hapus biodata",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

export default biodata