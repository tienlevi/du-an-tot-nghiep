import { Router } from "express";
import { orderControllers } from "../controllers/index.js";
import { authenticate } from "../middleware/authenticateMiddleware.js";

const orderRouter = Router();
orderRouter.post("/create", authenticate, orderControllers.createOrder);
orderRouter.get("/my-order", authenticate, orderControllers.getAllOrdersByUser);
orderRouter.get("/all", authenticate, orderControllers.getAllOrders);
orderRouter.get(
  "/details/:id",
  authenticate,
  orderControllers.getDetailedOrder
);

export default orderRouter;
