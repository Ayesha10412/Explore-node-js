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
const express_1 = __importDefault(require("express"));
const todosRoute_1 = require("./todos/todosRoute");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const userRouter = express_1.default.Router();
app.use("/todos", todosRoute_1.todosRouter);
app.use("/users", userRouter);
app.get('/error', (req, res, next) => {
    console.log("I am custom middleware!");
    next();
}, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("something");
        res.send('Hello World!! I am learning Express and MongoDB.');
    }
    catch (error) {
        next(error);
    }
}));
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found!!" });
});
app.use((error, req, res, next) => {
    if (error) {
        console.log("error", error);
        res.status(400).json({ message: "Something went wrong", error });
    }
});
exports.default = app;
