import { rootpath } from "../app.js"
import jwt from "jsonwebtoken"



export const content = async (req,res) => {
    const name = req.cookies.username;
    res.render('catalogue',{name});
}