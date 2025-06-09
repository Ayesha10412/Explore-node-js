const fs = require("fs")
const readStream = fs.createReadStream("./stream.txt", {encoding:"utf-8"})
const writeStream = fs.createWriteStream("./streamWrite.txt",{encoding:"utf-8"})

readStream.on("data",(data)=>{
  console.log(data);
  writeStream.write(data,(err)=>{
    if(err){
        throw Error("Error",err)
    }
  })
})
readStream.on("error", (err)=>{
    if(err){
        throw Error("Error", err)
    }
})
writeStream.on("error", (err)=>{
    if(err){
        throw  Error("Error",err)
    }
})

readStream.on("end",()=>{
    console.log("Reading Ended!!")
    writeStream.end()
})
writeStream.on("finish",()=>{
    console.log("Written Successfully!!")
})