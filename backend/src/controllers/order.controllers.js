import asyncHandler from "../helpers/asyncHandler.js";
import { orderServices } from "../services/index.js";

export const createOrder = asyncHandler(async (req, res, next) => {
  return await orderServices.createOrder(req, res, next);
});
export const getAllOrdersByUser = asyncHandler(async (req, res, next) => {
  return await orderServices.getAllOrdersByUser(req, res, next);
});
