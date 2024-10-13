import { Router } from "express";
import { createOrder, getOrderById, getOrders, getOrdersByUser } from "../controllers/orders";

const router = Router();

router.post("/orders", createOrder);
router.get("/orders", getOrders);
router.get("/orders/:userId/:orderId", getOrderById);
router.get('/orders/user/:userId', getOrdersByUser);


export default router;