const fs = require("fs");
console.log("Taskl")
const text= "Learning File System";
fs.writeFileSync("./hello.txt",text)
console.log("Task3")
const data = fs.readFileSync("./hello.txt",{encoding:"utf-8"})
console.log("Task4")
console.log(data)