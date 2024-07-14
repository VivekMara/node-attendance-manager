import { User } from "../models/user.model.js";
import { uri } from "../app.js";
import "dotenv/config.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


//register users in db with password hashed
export const registerUser = async(req,res) => {
    try {
        const {username,email,password} = req.body;
        const registereduser = await User.findOne({username});
        try {
            if (!registereduser) {
                const registeruser = await User.create({username,email,password});
                const token = jwt.sign({registeruser}, process.env.JWT_SECRET,{ expiresIn: 60 * 60 });
                res.cookie("jwt", token)
                res.cookie("username",username)
                res.redirect(`${uri}/content`)
            } else {
                res.status(404).json(
                    {
                        message:`${username} already exists!!`
                    }
                )
            }
        } catch (error) {
            res.status(404).json(
                {
                    message:`Error registering user!!!`
                }
            )
        }
    } catch (error) {
        res.status(500).json(
            {
                message:"Error registering user!!!"
            }
        )
    }
}

export const loginUser = async(req,res) => {
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        const hashedpassword = user.password;
        bcrypt.compare(password,hashedpassword,async function(err,result){
            if (result === true) {
                const token = jwt.sign({username}, process.env.JWT_SECRET,{ expiresIn: 60 * 60 });
                res.cookie("jwt", token)
                res.cookie("username",username)
                res.redirect(`${uri}/content`)
            }
            else{
                res.json({
                    message:"Password is incorrect!!!"
                })
            }
            
        });
        
    } catch (error) {
        res.status(500).json(
            {
                message:"Error loggin user!!!"
            }
        )
    }
}

export const logoutuser = async() => {
    res.redirect(`${uri}/`)
}


export const test = (req,res) => {
    res.send("MVC implemented!!")
}