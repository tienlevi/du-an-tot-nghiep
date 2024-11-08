import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import router from "./routers/index.js";
import notFoundHandler from "./errors/notFoundHandler.js";
import errorHandler from "./errors/errorHandle.js";
import { envConfig } from "./config/env.js";
import { initializeApp } from "firebase/app";

const app = express();

// firebase
initializeApp(envConfig.FIREBASE);

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// connect db
connectDB(envConfig.DB_URI);

// routers
app.use("/api", router);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
