import { uri } from "../app.js";
import { Task } from "../models/task.model.js";

export const taskview = async (req,res) => {
    const username = req.cookies.username;
    //const {username} = req.body;
    const tasks = await Task.find({username});
    const task = tasks.map(obj => obj.task);
    const completetask = async(req,res) => {
        const username = req.cookies.username;
        const task = this.task;
        const complete = true;
        const taskcomplete = await Task.updateOne({task:task, username:username},{complete});

    }
    res.render('taskview', {task,username,completetask})
}


export const addtask = async(req,res) => {
    const username = req.cookies.username;
    //const {username,task} = req.body;
    const {task} = req.body;
    try {
        const addTask = await Task.create({username,task});
        res.redirect(`${uri}/task/`)
        
    } catch (error) {
        res.status(500).json(
            {
                message:"Error adding task!!",
                error
            }
        )
    }
}

export const gettask = async(req,res) => {
    const username = req.cookies.username;
    //const {username} = req.body;
    try {
        
    } catch (error) {
        res.status(500).send("Error finding the task!!")
    }
}

export const updatetask = async(req,res) => {
    const username = req.cookies.username;
    const {task,complete} = req.body;
    const existingUser = await Task.findOne({username,task});
    try {
        if (existingUser) {
            const updateBooolean = await Task.updateOne(
                {task:task, username:username},{complete,pending,skip}
            );
            const updatedUser = await Task.findOne({username,task})
            res.status(200).send(updatedUser);
            
        }
        else{
            res.status(404).send(`${username} and ${task} does not exist!!`)
        }
    } catch (error) {
        res.status(404).send(error);
    }
}



export const deletetask = async(req,res) => {
    const username = req.cookies.username;
    const {task} = req.body;
    const existingUser = await Task.findOne({username,task});
    try {
        if (existingUser) {
            const deleteTask = await Task.deleteOne({username,task});
            res.status(200).send(`Task:${task} of username: ${username} has been deleted`);
        }
        else{
            res.status(404).send(`${username} and ${task} does not exist!!`)
        }
    } catch (error) {
        res.status(404).send(error);
    }
}
