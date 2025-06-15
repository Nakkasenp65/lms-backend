import express from "express";
import router from "./routes/v1/index.js";
const app = express();

app.use(express.json());

app.use("/role", router);

export default app;
