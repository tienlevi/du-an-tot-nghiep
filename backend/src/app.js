import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db";
import authRouter from "./routers/auth";
import productRouter from "./routers/product";
import categoryRouter from "./routers/category";
import cartRouter from "./routers/cart";
import orderRouter from "./routers/order";
import uploadRouter from "./routers/upload";
import favoritesRouter from "./routers/favorite";
import userRouter from "./routers/user";
import paymentRouter from "./routers/payment";
const app = express();

dotenv.config();
// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

// connect db
connectDB("mongodb://localhost:27017/DuAnTotNghiep");

// routers
app.use("/api/v1", authRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", uploadRouter);
app.use("/api/v1", favoritesRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", paymentRouter);

export const viteNodeApp = app;
