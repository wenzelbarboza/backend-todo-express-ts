import { Router } from "express";
import { signInUser, getUsers } from "../controllers/user.controller";

const routes = Router();

routes.route("/signup").post(signInUser);
routes.route("/getusers").get(getUsers);

export default routes;
