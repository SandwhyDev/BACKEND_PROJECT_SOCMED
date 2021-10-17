import express from "express"
import ps from "../prisma/connection"
import upload_avatar from "../services/multer_avatar"
import path from "path"
import { compare_password, hash_password } from "../services/hash_services"
import form_data from "../services/form_service"
import { sign_jwt, verify_jwt } from "../services/jwt_services"

const user = express.Router()

user.post("/user_register", upload_avatar.single("avatar"),async (req,res)=>{
    try {
        const data = await req.body
        const file = await req.file
        const result = await ps.user.create({
            data : {
                email : data.email,
                password : hash_password(data.password),
                avatar : {
                    create : {
                        filename : file.filename,
                        image_path : path.join(__dirname, `../static/uploads/avatar/${file.filename}`),

                    }
                }
                
            }
        })

        res.json({
            success : true,
            msg : "berhasil register",
            query : result
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

user.post("/user_login", form_data.none(), async(req,res)=>{
    try {
        const data = await req.body
        const result = await ps.user.findUnique({
            where : {
                email : data.email
            }
        })

        if(!result){
            res.json({
                success : false,
                msg : "email salah"
            })
            return
        }

        const cek_password = await compare_password(data.password, result.password)
        if(!cek_password){
            res.json({
                success : false,
                msg : "password salah"
            })
            return
        }

        res.json({
            success : true,
            msg : "berhasil login",
            token : sign_jwt({
                ...result,
                password : "********"
            })
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

user.get("/user_read_all", async(req,res)=>{
    try {
        const result = await ps.user.findMany({
            include : {
                biodata : true,
                avatar : true,
                post : true,
                like : true,
                comment : true,
                reply : true,
                followers : true,
                following : true
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

user.get("/user_read_unique/:id", async(req,res)=>{
    try {
        const {id} = await req.params

        const result = await ps.user.findUnique({
            where : {
                id : parseInt(id)
            },
            include : {
                avatar : true,
                biodata : true,
                post : true,
                followers : true,
                following : true,
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

user.put("/user_update/:id", verify_jwt,upload_avatar.single("avatar"), async(req,res)=>{
    try {
        const {id} = await req.params
        const data = await req.body
        const file = await req.file
        const result = await ps.user.update({
            where : {
                id : parseInt(id)
            },
            data : {
                email : data.email,
                password : hash_password(data.password),
                avatar : {
                    update : {
                        filename : file.filename,
                        image_path : path.join(__dirname, `/uploads/avatar/${file.filename}`),
                    }
                }
            }
        })
        res.json({
            success : true,
            msg : "berhasil update user",
            query : result,
            
        })
    } catch (error) {
        res.json({
            success : false,
            error : error.message
        })
    }
})

user.delete("/user_delete/:id", verify_jwt,async(req,res)=>{
  try {
    const {id} = await req.params
    const result = await ps.user.delete({
        where : {
            id : parseInt(id)
        }
    })
    res.json({
        success : true,
        msg : "berhasil hapus user",
        query : result,
        
    })
  } catch (error) {
    res.json({
        success : false,
        error : error.message
    })
  }
})
export default user