import express, { Request, Response } from "express"
import path from "path"
import fs from "fs"
import { client } from "../../config/mongoDB"
export const todosRouter=express.Router()
const filePath = path.join(__dirname,"../../../db/todo.json")
todosRouter.get('/',(req:Request, res:Response)=>{
   
    const data = fs.readFileSync(filePath,{encoding:"utf-8"})
  console.log("From todos router")
    res.json({
        message:"From Todos Router",data
    })
})
todosRouter.post('/create-todo',async(req:Request,res:Response)=>{
    const {title,description,priority}= req.body
   const db =  client.db("todosDB")
const collection =  db.collection("todos")
await collection.insertOne({title:"MongoDB",
    description:"Using MongoDB",
    priority:"High",
    isCompleted:false
})
const todos= await collection.find({}).toArray()
res.status(201).json({message:"Todos created successfully",todos})
})

// JbSutunp5HzJndRr