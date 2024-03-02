import express from "express";
import cors from "cors";
import cookiparser from "cookie-parser";
import { Request, Response, NextFunction } from "express";

const app = express();

app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cookiparser());

// routes
import userRouter from "./routes/user.routes";
import todoRouter from "./routes/todo.routes";

app.get("/api/v1", (req: Request, res: Response, next: NextFunction) => {
    res.send("welcome to root page");
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

// globla catch
import { globalCatch } from "./utils/globalCatch";
app.use(globalCatch);

export { app };
