import { Router } from "express";
import { loginUser, registerUser, test } from "../controllers/user.controller.js";




export const userRouter = Router()


userRouter.post("/signup", (req,res) => registerUser(req,res));
userRouter.post("/login", (req,res) => loginUser(req,res));