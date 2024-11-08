import { Router } from "express";
import { productControllers } from "../controllers/index.js";
import upload from "../middleware/multerMiddleware.js";

const productRoutes = Router();

productRoutes.get("/all", productControllers.getAllProducts);
productRoutes.post(
  "/create",
  upload.fields([{ name: "variantImages", maxCount: 10 }]),
  productControllers.createProduct
);

export default productRoutes;
