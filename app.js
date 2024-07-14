import express from "express"
import "dotenv/config.js"
import mongoose from "mongoose"
import { userRouter } from "./routes/user.router.js"
import cookieParser from "cookie-parser"
import { contentRouter } from "./routes/content.router.js"
import { taskRouter } from "./routes/task.router.js"


const app = express()
export const rootpath = new URL(import.meta.dirname);
export const uri = `http://localhost:${process.env.PORT}`




app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static("public"))
app.set('view engine','ejs')
app.set('views','./views')


const dbconnection = async() => {
    try {
        const connection = mongoose.connect(`${process.env.MONGODB_URI}/uni-productivity-app`);
        console.log("DB connected successfully!!!")
    } catch (error) {
        console.error(error)
    }

}
dbconnection()


app.get("/",(req,res) => {
    res.render('home')
})

app.get("/user/signup", (req,res) => {
    res.render('signup')
})

app.get("/user/login", (req,res) => {
    res.render('login')
})




app.use("/user", userRouter )
app.use("/content", contentRouter)
app.use("/task", taskRouter)




app.listen(process.env.PORT , () => {
    console.log(`App is running on http://localhost:${process.env.PORT}`)
})