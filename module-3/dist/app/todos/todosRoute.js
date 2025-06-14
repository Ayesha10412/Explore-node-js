"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const mongoDB_1 = require("../../config/mongoDB");
const mongodb_1 = require("mongodb");
exports.todosRouter = express_1.default.Router();
const filePath = path_1.default.join(__dirname, "../../../db/todo.json");
exports.todosRouter.get('/', (req, res) => {
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    console.log("From todos router");
    res.json({
        message: "From Todos Router", data
    });
});
exports.todosRouter.post('/create-todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, priority } = req.body;
    const db = mongoDB_1.client.db("todosDB");
    const collection = db.collection("todos");
    yield collection.insertOne({ title: "MongoDB",
        description: "Using MongoDB",
        priority: "High",
        isCompleted: false
    });
    const todos = yield collection.find({}).toArray();
    res.status(201).json({ message: "Todos created successfully", todos });
}));
exports.todosRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield mongoDB_1.client.db("todosDB");
    const collection = yield db.collection("todos");
    const todo = yield collection.findOne({ _id: new mongodb_1.ObjectId(id) });
    res.json(todo);
}));
exports.todosRouter.put("/update-todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield mongoDB_1.client.db("todosDB");
    const collection = yield db.collection("todos");
    const filter = { _id: new mongodb_1.ObjectId(id) };
    const { title, description, priority, isCompleted } = req.body;
    const updatedDoc = yield collection.updateOne(filter, { $set: { title, description, priority, isCompleted } }, { upsert: true });
    res.json(updatedDoc);
}));
exports.todosRouter.delete("/delete-todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield mongoDB_1.client.db("todosDB");
    const collection = yield db.collection("todos");
    const todo = yield collection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
    console.log("Deleting Data", todo);
    res.json(todo);
}));
// JbSutunp5HzJndRr
