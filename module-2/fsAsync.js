const fs=require("fs");
console.log("Task1")
const data="Node.js";

fs.writeFile("./hello.txt",data,{encoding:"utf-8"},(err,data)=>{
    if(err){
        console.log("Something Went Wrong",err)
        return ;
    }
console.log("After Writing:",data)
})
console.log("Data:",data)
fs.readFile("./hello.txt",{encoding:"utf-8"},(err,data)=>{
    if(err){
        console.log("Something Went Wrong",err)
        return;
    }
    console.log(data)
})
console.log("data:",data)
console.log("Task3")