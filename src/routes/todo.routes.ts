import { Router } from "express";
import { getTodos, insertTodo } from "../controllers/todo.controller";

const routes = Router();

routes.route("/insert").put(insertTodo);
routes.route("/getall").get(getTodos);

export default routes;
