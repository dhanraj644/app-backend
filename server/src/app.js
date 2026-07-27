import express from "express";
import routes from "./routes/index.js";
const app=express();

app.use(express.urlencoded());
app.use(express.urlencoded());

app.use("/api", routes);


export default app;