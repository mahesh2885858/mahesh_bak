import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import adminRouter from "./routes/adminRouter.js";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
const db = mongoose
  .connect(process.env.URL)
  .then(() => console.log("it's connected to mongo"))
  .catch((Err) => console.log(Err));
app.use(express.json());
app.use("/", userRouter);
app.use("/admin", adminRouter);
const port = process.env.PORT;
app.listen(port, () => console.log(`the server is running on port ${port}`));
