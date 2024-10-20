import { Router } from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  getOrderByUserId,
} from "../controllers/orders";

const router = Router();

router.post("/orders", createOrder);
router.get("/orders", getOrders);
router.get("/orders/:userId/:orderId", getOrderById);
router.get("/orders/:userId", getOrderByUserId);

// Thêm route cập nhật trạng thái đơn hàng
router.put("/orders/:orderId/status", updateOrderStatus);

// Thêm route hủy đơn hàng

export default router;
