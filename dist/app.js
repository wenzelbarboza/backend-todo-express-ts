"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.use(express_1.default.json({ limit: "16kb" }));
app.use(express_1.default.urlencoded({ limit: "16kb" }));
app.use(express_1.default.static("public"));
app.use((0, cookie_parser_1.default)());
// routes
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
app.get("/api/v1", (req, res, next) => {
    res.send("welcome to root page");
});
app.use("/api/v1/user", user_routes_1.default);
app.use("/api/v1/todo", todo_routes_1.default);
// globla catch
const globalCatch_1 = require("./utils/globalCatch");
app.use(globalCatch_1.globalCatch);
