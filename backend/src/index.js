import cors from "cors";
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

app.use(express.urlencoded({ extended: true }));


// connect db
connectDB(envConfig.DB_URL);

// routers
app.use("/api", router);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(envConfig.PORT, () => {
  console.log("Server is running on port " + envConfig.PORT);
});
