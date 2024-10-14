import { Router } from "express";
import {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder,
} from "../controllers/orders";

const router = Router();

router.post("/orders", createOrder);
router.get("/orders", getOrders);
router.get("/orders/:userId/:orderId", getOrderById);

// Thêm route cập nhật trạng thái đơn hàng
router.put("/orders/:orderId/status", updateOrderStatus);

// Thêm route hủy đơn hàng
router.delete("/orders/:orderId/cancel", cancelOrder);

export default router;
