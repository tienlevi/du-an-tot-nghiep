import { productService } from "../services/index.js";
import asyncHandler from "../helpers/asyncHandler.js";

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productService.getALlProducts();
  res.json(products);
});
export const createProduct = asyncHandler(async (req, res) => {
  console.log(req.body, "ok");
  const products = await productService.createProduct(req.body, req.files);
  res.json(products);
});
