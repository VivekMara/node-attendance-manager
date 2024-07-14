import { Router } from "express";
import { addtask, deletetask, gettask, taskview, updatetask } from "../controllers/task.controller.js";

export const taskRouter = Router();

taskRouter.post('/addtask', (req,res) => addtask(req,res));
taskRouter.get('/gettask', (req,res) => gettask(req,res));
taskRouter.put('/updatetask', (req,res) => updatetask(req,res));
taskRouter.delete('/deletetask', (req,res) => deletetask(req,res));
taskRouter.get('/',(req,res) => taskview(req,res))
