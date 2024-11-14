import asyncHandler from "../helpers/asyncHandler.js";
import { tagServices } from "../services/index.js";

// @Post create new Tag
export const createTag = asyncHandler(async (req, res, next) => {
  return tagServices.createNewTag(req, res, next);
});

// @Get get Tag
export const getTag = asyncHandler(async (req, res, next) => {
  return tagServices.getTag(req, res, next);
});

// @Patch update Tag
export const updateTag = asyncHandler(async (req, res, next) => {
  return tagServices.updateTag(req, res, next);
});
