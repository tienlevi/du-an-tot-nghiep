import { productService } from "../services/index.js";
import asyncHandler from "../helpers/asyncHandler.js";

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAllProducts(req.query);
  res.json(products);
});
export const getBestSellingProducts = asyncHandler(async (req, res) => {
  const products = await productService.getBestSellingProducts();
  res.json(products);
});
export const getDiscountProducts = asyncHandler(async (req, res) => {
  const products = await productService.getDiscountProducts();
  res.json(products);
});
export const createProduct = asyncHandler(async (req, res) => {
  console.log(req.body, "ok");
  const products = await productService.createProduct(req.body, req.files);
  res.json(products);
});
