import express, { Request, Response } from "express"
import path from "path"
import fs from "fs"
import { client } from "../../config/mongoDB"
import { ObjectId } from "mongodb"
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
todosRouter.get("/:id",async(req:Request,res:Response)=>{
    const id = req.params.id;
const db = await client.db("todosDB")
const collection = await db.collection("todos")
const todo = await collection.findOne({_id:new ObjectId(id)})
res.json(todo)
})

todosRouter.put("/update-todo/:id",async(req:Request,res:Response)=>{
    const id = req.params.id;
const db = await client.db("todosDB")
const collection = await db.collection("todos")
const filter={_id:new ObjectId(id)}
const {title,description,priority,isCompleted}=req.body
const updatedDoc = await collection.updateOne(filter,{$set:{title,description,priority,isCompleted}},{upsert:true})
res.json(updatedDoc)
})
todosRouter.delete("/delete-todo/:id",async(req:Request,res:Response)=>{
    const id = req.params.id;
const db = await client.db("todosDB")
const collection = await db.collection("todos")
const todo = await collection.deleteOne({_id:new ObjectId(id)})
console.log("Deleting Data",todo)
res.json(todo)
})
// JbSutunp5HzJndRr