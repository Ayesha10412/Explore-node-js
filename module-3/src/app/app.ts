import express, { Application, Request, Response } from 'express'
import fs from "fs"
import path from 'path'
import { todosRouter } from './todos/todosRoute'
const app:Application = express()
app.use(express.json())
const userRouter = express.Router()
app.use("/todos",todosRouter)
app.use("/users",userRouter)
todosRouter.get('/todos',(req:Request, res:Response)=>{
   
    const data = fs.readFileSync(filePath,{encoding:"utf-8"})
  console.log("From todos router")
    res.json({
        message:"From Todos Router",data
    })
})
const filePath = path.join(__dirname, "../../db/todo.json")
app.get('/',(req:Request,res:Response)=>{
res.send('Hello World!! I am learning Express and MongoDB.')
})
app.get('/todos/:id',(req:Request, res:Response)=>{
    console.log("From Query:",req.query)
    console.log("From Params:",req.params)
    const data = fs.readFileSync(filePath,{encoding:"utf-8"})
//   console.log(data)
    res.json(data)
})

export default app;