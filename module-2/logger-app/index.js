// console.log(process.argv)
const path = require("path")
const fs =require("fs")
const inputArgument = process.argv.slice(2)
const text = inputArgument.join(" ").concat("\n");
const timeStamp = new Date().toISOString()
const message = `${text} ${timeStamp} \n`
// console.log(inputArgument)

if(!message){
    console.log("Please Provide a message to log!!")
    console.log("Example: Node index.js Hello World!!")
    process.exit(1)
}

const filePath = path.join(__dirname, "log.txt")
fs.appendFile(filePath,message,{encoding:"utf-8"},()=>{
    console.log("Logged added Successfully!!")
})
console.log(filePath)