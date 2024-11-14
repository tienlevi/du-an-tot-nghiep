import { Router } from "express";
import categoryRouter from "./category.routes.js";
import productRouter from "./product.routes.js";
import cartRouter from "./cart.routes.js";
import checkoutRouter from "./checkout.routes.js";
import authRouter from "./auth.routes.js";
import sizeRouter from "./size.routes.js";
import colorRouter from "./color.routes.js";
import reviewRouter from "./review.routes.js";
import tagRouter from "./tag.routes.js";
import userRouter from "./user.routes.js";

const router = Router();

router.use("/category", categoryRouter);
router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/carts", cartRouter);
router.use("/checkout", checkoutRouter);
router.use("/size", sizeRouter);
router.use("/color", colorRouter);
router.use("/review", reviewRouter);
router.use("/tag", tagRouter);
router.use("/user", userRouter);

export default router;
