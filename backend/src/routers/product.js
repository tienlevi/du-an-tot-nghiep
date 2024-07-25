import { Router } from "express";
import {
  create,
  deleteProductById,
  getProductById,
  getProducts,
  related,
  updateProductById,
} from "../controllers/product";

const router = Router();
router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.get("/products/:categoryId/related/:productId", related);
router.delete("/products/:id", deleteProductById);
router.put("/products/:id", updateProductById);
router.post("/products", create);

export default router;
