"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = require("../controllers/todo.controller");
const routes = (0, express_1.Router)();
routes.route("/insert").post(todo_controller_1.insertTodo);
routes.route("/getall").get(todo_controller_1.getallTodos);
routes.route("/todoid").get(todo_controller_1.getTodoByUserId);
exports.default = routes;
