"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const todosRoute_1 = require("./todos/todosRoute");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const userRouter = express_1.default.Router();
app.use("/todos", todosRoute_1.todosRouter);
app.use("/users", userRouter);
todosRoute_1.todosRouter.get('/todos', (req, res) => {
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    console.log("From todos router");
    res.json({
        message: "From Todos Router", data
    });
});
const filePath = path_1.default.join(__dirname, "../../db/todo.json");
app.get('/', (req, res) => {
    res.send('Hello World!! I am learning Express and MongoDB.');
});
app.get('/todos/:id', (req, res) => {
    console.log("From Query:", req.query);
    console.log("From Params:", req.params);
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    //   console.log(data)
    res.json(data);
});
exports.default = app;
