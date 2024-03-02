import { app } from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5002;

app.listen(port, () => {
    console.log("server running at ", port);
});
