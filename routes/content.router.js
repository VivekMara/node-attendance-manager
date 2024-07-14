import { Router } from "express";
import {authorise} from "../middlewares/authorisation.middleware.js";
import { content } from "../controllers/content.controller.js";

export const contentRouter = Router();

contentRouter.get("/", (req,res,next) => authorise(req,res,next), (req,res) => content(req,res))


