"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const routes = (0, express_1.Router)();
routes.route("/signup").post(user_controller_1.signInUser);
routes.route("/getusers").get(user_controller_1.getUsers);
exports.default = routes;
