import asyncHandler from "../helpers/asyncHandler.js";
import { authServices } from "../services/index.js";

// @Register
export const register = asyncHandler(async (req, res, next) => {
  return await authServices.register(req, res, next);
});
// @Login
export const login = asyncHandler(async (req, res, next) => {
  return await authServices.login(req, res, next);
});
