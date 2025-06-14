import express, { Application, NextFunction, Request, Response } from 'express'
import { todosRouter } from './todos/todosRoute'
const app:Application = express()
app.use(express.json())
const userRouter = express.Router()
app.use("/todos",todosRouter)
app.use("/users",userRouter)

app.get('/error',(req:Request,res:Response,next:NextFunction)=>{
console.log("I am custom middleware!")
next()
},
async(req:Request,res:Response,next:NextFunction)=>{
try{
    console.log("something")
    res.send('Hello World!! I am learning Express and MongoDB.')

}
catch(error){
  next(error)
}
})
app.use((req,res,next)=>{
    res.status(404).json({message:"Route not found!!"})
})
app.use((error:any,req:Request,res:Response,next:NextFunction)=>{
    if(error){
        console.log("error",error)
        res.status(400).json({message:"Something went wrong",error})
    }
})

export default app;