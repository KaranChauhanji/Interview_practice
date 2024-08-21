const express = require("express");
const addTodo = require("../controllers/TodoReq/addTodo.controller");
const auth = require("../middlewares/auth.middleware");
const getTodo = require("../controllers/TodoReq/getTodo.controllers");
const editTodo = require("../controllers/TodoReq/editTodo.controllers");
const deleteTodo = require("../controllers/TodoReq/deleteTodo.controllers");
const todoRouter = express.Router();

todoRouter.get("/", getTodo);
todoRouter.post("/", auth, addTodo);
todoRouter.patch("/:id", auth, editTodo);
todoRouter.delete("/:id", auth, deleteTodo);

module.exports = todoRouter;
