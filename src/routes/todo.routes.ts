import { Router } from "express";
import {
    getTodoByUserId,
    getallTodos,
    insertTodo,
    updateDiscription,
    updateDone,
    updateTitle,
} from "../controllers/todo.controller";

const routes = Router();

routes.route("/insert").post(insertTodo);
routes.route("/getall").get(getallTodos);
routes.route("/todoid").get(getTodoByUserId);
routes.route("/updateDone").post(updateDone);
routes.route("/updatetitle").post(updateTitle);
routes.route("/updatediscription").post(updateDiscription);

export default routes;
