import asyncHandler from "../helpers/asyncHandler.js";
import { reviewServices } from "../services/index.js";

// @Post create new review
export const createReview = asyncHandler(async (req, res, next) => {
  return reviewServices.createNewReview(req, res, next);
});

// @Get get all reviews
export const getAllReviews = asyncHandler(async (req, res, next) => {
  return reviewServices.getAllReviews(req, res, next);
});

// @Get get review by product id
export const getReviewByProductId = asyncHandler(async (req, res, next) => {
  return reviewServices.getReviewByProductId(req, res, next);
});
