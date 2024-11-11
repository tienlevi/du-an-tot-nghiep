import asyncHandler from "../helpers/asyncHandler.js";
import { sizeServices } from "../services/index.js";

// @Post create new category
export const createSize = asyncHandler(async (req, res, next) => {
  return sizeServices.createNewSize(req, res, next);
});

// @Get get all categories
export const getAllSizes = asyncHandler(async (req, res, next) => {
  return sizeServices.getAllSizes(req, res, next);
});

// @Patch update category
export const updateSize = asyncHandler(async (req, res, next) => {
  return sizeServices.updateSize(req, res, next);
});
