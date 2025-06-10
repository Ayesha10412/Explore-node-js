const http = require("http")
const path=require("path")
const fs = require("fs")
const filePath = path.join(__dirname,"../db/todo.json")

const server = http.createServer((req,res)=>{
    const url = new URL(req.url,`http://${req.headers.host}`)
    const pathname = url.pathname
    // console.log(url)
    // console.log(req.url,req.method);
    // res.end("Welcome to ToDo App Server")
// All todos
    if
    (req.url==="/todos" && req.method==="GET"){
        const data = fs.readFileSync(filePath,{encoding:"utf-8"})
        res.writeHead(200,{
            "content-type":"application/json",
            // "email":"ayesha@gmail.com"
        })
        // res.setHeader("content-type:","text/plain"),
        // res.setHeader("email:","ayesha@gmail.com")
        // res.statusCode=201;
        // res.end("All Todos")
        // res.end(JSON.stringify(data))
        // res.end(`<h1>Hello World </h1> <h2>Hello World </h2> <h3>Hello World </h3>`)
        res.end(data)
    }
    // post a todo
    else if(pathname==="/todos/create-todo" && req.method==="POST"){
        let data = ""
        req.on("data", (chunk)=>{
data=data+chunk
        })
        // console.log(data)
        req.on("end",()=>{
            console.log(data)
            const {title,body} = JSON.parse(data)
            console.log({title,body})
            const createdAt = new Date().toLocaleDateString()
            const allTodos = fs.readFileSync(filePath,{encoding:"utf-8"})
            const parseAllTodos = JSON.parse(allTodos)
            parseAllTodos.push({title,body,createdAt})
fs.writeFileSync(filePath,JSON.stringify(parseAllTodos,null,2),{encoding:"utf-8"})
 fs.readFileSync(filePath,{encoding:"utf-8"})
        res.end(JSON.stringify({title,body,createdAt},null,2))
        })
       
    }
    else if(pathname==="/todo" && req.method==="GET"){
        const title = url.searchParams.get("title")
        console.log(title)
        const data = fs.readFileSync(filePath,{encoding:"utf-8"})
        const  parsedData = JSON.parse(data);
        const todo= parsedData.find((todo)=>todo.title===title)
        const stringifiedTodo = JSON.stringify(todo)
        res.writeHead(200,{
            "content-type":"application/json"
        })

        res.end(stringifiedTodo)
        // res.end("single todo")
    }

else if (pathname === "/todos/update-todo" && req.method === "PATCH") {
      const title = url.searchParams.get("title");
      let data = "";

      req.on("data", (chunk) => {
        data = data + chunk;
      });

      req.on("end", () => {
        const { body } = JSON.parse(data);

        const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
        const parsedAllTodos = JSON.parse(allTodos);

        const todoIndex = parsedAllTodos.findIndex(
          (todo) => todo.title === title
        );

        parsedAllTodos[todoIndex].body = body;

        fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos, null, 2), {
          encoding: "utf-8",
        });

        res.end(
          JSON.stringify(
            { title, body, createdAt: parsedAllTodos[todoIndex].createdAt },
            null,
            2
          )
        );
      });
    }
    else if (pathname === "/todos/delete-todo" && req.method === "DELETE") {
      const title = url.searchParams.get("title");
        
       try {
    const allTodos = fs.readFileSync(filePath, "utf-8");
    const parsedAllTodos = JSON.parse(allTodos);

    const filteredTodos = parsedAllTodos.filter(todo => todo.title !== title);

    if (filteredTodos.length === parsedAllTodos.length) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      return res.end("Todo not found");
    }

    fs.writeFileSync(filePath, JSON.stringify(filteredTodos, null, 2), "utf-8");

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: `Todo '${title}' deleted successfully` }));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server error");
  }
       
    }

    else{
        res.end("Route not found!!")
    }
})
server.listen(5000,"127.0.0.1",()=>{
    console.log("Server listening to port 5000" )
})