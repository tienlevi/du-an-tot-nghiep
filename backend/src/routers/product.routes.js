import { Router } from "express";
import { productControllers } from "../controllers/index.js";
import upload from "../middleware/multerMiddleware.js";

const productRoutes = Router();

productRoutes.get("/all", productControllers.getAllProducts);
productRoutes.get("/best-selling", productControllers.getBestSellingProducts);
productRoutes.get("/discount", productControllers.getDiscountProducts);
productRoutes.get("/:id", productControllers.getProductById);
productRoutes.put(
  "/update/:id",
  upload.fields([{ name: "variantImages", maxCount: 10 }]),
  productControllers.updateProduct
);
productRoutes.post(
  "/create",
  upload.fields([{ name: "variantImages", maxCount: 10 }]),
  productControllers.createProduct
);

export default productRoutes;
