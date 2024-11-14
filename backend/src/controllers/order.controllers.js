import asyncHandler from "../helpers/asyncHandler.js";
import { orderServices } from "../services/index.js";

export const createOrder = asyncHandler(async (req, res, next) => {
  return await orderServices.createOrder(req, res, next);
});
export const getAllOrdersByUser = asyncHandler(async (req, res, next) => {
  return await orderServices.getAllOrdersByUser(req, res, next);
});
export const getAllOrders = asyncHandler(async (req, res, next) => {
  return await orderServices.getAllOrders(req, res, next);
});
export const getDetailedOrder = asyncHandler(async (req, res, next) => {
  return await orderServices.getDetailedOrder(req, res, next);
});
