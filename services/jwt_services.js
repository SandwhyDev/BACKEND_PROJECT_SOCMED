import jwt from "jsonwebtoken"
import env from "dotenv"
env.config()

export const sign_jwt = (payload)=>{
    return jwt.sign(payload, process.env.SECRET_KEY)
}

//middleware function
export const verify_jwt = async (req,res,next)=>{
    try {
        
        let auth_header = await req.headers["authorization"]

        if(!auth_header){
            res.json({
                success : false,
                msg : "authorization tidak ada"
            })
            return
        }

        let token = await auth_header.split(" ")[1]
        let cek_token = await jwt.verify(token, process.env.SECRET_KEY)
        if(!cek_token){

            res.json({
                success : false,
                msg : "jwt mal format"
            })

            return
        }

        next()

    } catch (error) {
        res.json({
            success : false,
            msg : "jwt mal format"
        })
    }
}

