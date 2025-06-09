const EventEmitter = require('node:events');

class SchoolBell extends EventEmitter {}
const schoolBell = new SchoolBell();
 schoolBell.on("ring",()=>{
console.log("Yahoo!! Class is finish.");
})

 schoolBell.on("broken",()=>{
console.log("Oh no!! Why class is not ending?");
})
 schoolBell.on("ring",()=>{
console.log("Oh shit!! Another class is starting.");
})

schoolBell.emit("ring")
schoolBell.emit("broken")