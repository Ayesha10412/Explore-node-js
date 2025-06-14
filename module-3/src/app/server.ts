import { client } from "../config/mongoDB";
import app from "./app";

let server;
const port = 5000

const bootstrap=async()=>{
     await client.connect();
     console.log("Connected to MongoDB")
    server=app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
})
}
bootstrap()