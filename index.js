import express from "express"
import cors from "cors"
import env from "dotenv"
import user from "./routes/user_route"
import biodata from "./routes/biodata.route"
import avatar from "./routes/avatar_route"
import post from "./routes/post_route"
import like_post from "./routes/like_post_route"
import reply from "./routes/reply_route"
import follow from "./routes/followers_route"
import comment from "./routes/comment_route"

env.config()


const app = express()
const {PORT} = process.env

//middlware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))

//route
app.use("/api", user)
app.use("/api", avatar)
app.use("/api", biodata)
app.use("/api", post)
app.use("/api", like_post)
app.use("/api", comment)
app.use("/api", reply)
app.use("/api", follow)



//listener
app.listen(PORT,()=>{
    console.log(`listened to port ${PORT}`);
})