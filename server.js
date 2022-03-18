import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import MongoDBStore from "connect-mongodb-session";
import userRouter from "./routes/userRouter.js";
import adminRouter from "./routes/adminRouter.js";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
const mongodbStore = MongoDBStore(session);
dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
const store = new mongodbStore({
  uri: process.env.URL,
  collection: "userSessions",
});
app.use(
  session({
    secret: "mahesh123jas;lfjaslf6547r61243123",
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      httpOnly: true,

      maxAge: 1000 * 60 * 30, //user will logout in 30 minutes
    },
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
