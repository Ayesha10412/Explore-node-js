const fs = require("fs")
fs.readFile("./hello-World.txt",{encoding:"utf-8"},(err,data)=>{
    if(err){
  console.log("Something Went Wrong",err)
    return;
    }
  fs.writeFile("./hello.txt",data,{encoding:"utf-8"},(err)=>{
    if(err){
 console.log("Something Went Wrong",err)
    return;
    }
   console.log("Written Successful!")
})


})


