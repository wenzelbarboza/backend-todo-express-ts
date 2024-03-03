import { Router } from "express";
import {
    getTodoByUserId,
    getallTodos,
    insertTodo,
} from "../controllers/todo.controller";

const routes = Router();

routes.route("/insert").post(insertTodo);
routes.route("/getall").get(getallTodos);
routes.route("/todoid").get(getTodoByUserId);

export default routes;
