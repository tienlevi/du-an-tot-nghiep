import { Router } from "express";
import categoryRoutes from "./category.routes.js";
import productRoutes from "./product.routes.js";
import cartRouter from "./cart.routes.js";
import checkoutRouter from "./checkout.routes.js";
import authRoutes from "./auth.routes.js";
import orderRouter from "./order.routes.js";

const router = Router();

router.use("/category", categoryRoutes);
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/carts", cartRouter);
router.use("/checkout", checkoutRouter);
router.use("/orders", orderRouter);

export default router;
