import { Router } from "express";
import {
  addItemToCart,
  decreaseProductQuantity,
  getCartByUserId,
  increaseProductQuantity,
  removeFromCart,
  updateProductQuantity,
} from "../controllers/cart";

const router = Router();

// lấy danh sách sản phẩm trong giỏ hàng dựa vào ID
router.get("/carts/:id", getCartByUserId);
// Thêm sản phẩm vào giỏ hàng
router.post("/carts/add-to-cart", addItemToCart);
// Cập nhật số lượng của sản phẩm trong giỏ hàng từ input
router.post("/carts/update", updateProductQuantity);
// Xóa item trong giỏ hàng
router.post("/carts/remove-cart/:productId/:userId", removeFromCart);
// Tăng số lượng của sản phẩm trong giỏ hàng
router.post("/carts/increase/:productId/:userId", increaseProductQuantity);
// Giảm số lượng của sản phẩm trong giỏ hàng
router.post("/carts/decrease/:productId/:userId", decreaseProductQuantity);

export default router;
