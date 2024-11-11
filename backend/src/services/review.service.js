import { ReasonPhrases, StatusCodes } from "http-status-codes";
import customResponse from "../helpers/response.js";
import Review from "../models/review.js";
import handleQuery from "../utils/handleQuery.js";

// @Post create new review
export const createNewReview = async (req, res, next) => {
  const review = await Review.create(req.body);

  return res.status(StatusCodes.CREATED).json(
    customResponse({
      data: review,
      message: ReasonPhrases.CREATED,
      status: StatusCodes.OK,
      success: true,
    })
  );
};

// @Get get all reviews
export const getAllReviews = async (req, res, next) => {
  const { data, page, totalDocs, totalPages } = await handleQuery(req, Size);
  return res.status(StatusCodes.OK).json(
    customResponse({
      data: {
        reviews: data,
        page,
        totalDocs,
        totalPages,
      },
      message: ReasonPhrases.OK,
      status: StatusCodes.OK,
      success: true,
    })
  );
};

// @Post create new review
export const getReviewByProductId = async (req, res, next) => {
  const reviews = await Review.findById(req.params.id);
  
  return res.status(StatusCodes.OK).json(
    customResponse({
      data: reviews,
      message: ReasonPhrases.OK,
      status: StatusCodes.OK,
      success: true,
    })
  );
};
