"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = require("../controllers/todo.controller");
const routes = (0, express_1.Router)();
routes.route("/insert").put(todo_controller_1.insertTodo);
routes.route("/getall").get(todo_controller_1.getTodos);
exports.default = routes;
