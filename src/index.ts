import express from "express";
import mongoose from "mongoose";
import personRouter from "./routers/personRouter.js";

mongoose.connect("mongodb://localhost:27017/logistiksystem").then(() => {
  console.log("Connected");
});

const app = express();
const port = 3000;

app.use(express.json());

app.use("/person", personRouter);

app.listen(port, () => {
  console.log(`Server started on  http://localhost:${port}`);
});
