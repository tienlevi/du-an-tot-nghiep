import cors from "cors";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import router from "./routers/index.js";
import notFoundHandler from "./errors/notFoundHandler.js";
import errorHandler from "./errors/errorHandle.js";
import { envConfig } from "./config/env.js";
import { initializeApp } from "firebase/app";
import { handleInsertData } from "./data/index.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticFolderPath = path.join(__dirname, 'public');

const app = express();

// firebase
initializeApp(envConfig.FIREBASE);

// middleware
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (
        ["http://localhost:5173", "http://localhost:3000"].indexOf(origin) !==
          -1 ||
        !origin || envConfig.NODE_ENV === "development"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(morgan("tiny"));

app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(staticFolderPath));
console.log(staticFolderPath)
// connect db
connectDB(envConfig.DB_URL);

// routers
app.use("/api", router);
app.use("/api/import-data", handleInsertData);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(envConfig.PORT, () => {
  console.log("Server is running on port " + envConfig.PORT);
});
