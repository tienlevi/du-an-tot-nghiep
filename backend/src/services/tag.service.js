import { ReasonPhrases, StatusCodes } from "http-status-codes";
import customResponse from "../helpers/response.js";
import Tag from "../models/size.js";
import handleQuery from "../utils/handleQuery.js";

// @Post create new tag
export const createNewTag = async (req, res, next) => {
  const tag = await Tag.create(req.body);

  return res.status(StatusCodes.CREATED).json(
    customResponse({
      data: tag,
      message: ReasonPhrases.CREATED,
      status: StatusCodes.OK,
      success: true,
    })
  );
};

// @Get get tag
export const getTag = async (req, res, next) => {
  const tag = await Tag.findById(req.params.id).lean();

  return res.status(StatusCodes.OK).json(
    customResponse({
      data: tag,
      message: ReasonPhrases.OK,
      status: StatusCodes.OK,
      success: true,
    })
  );
};

// @Post update tag
export const updateTag = async (req, res, next) => {
  const tag = await Tag.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  }).lean();

  return res.status(StatusCodes.OK).json(
    customResponse({
      data: { tag },
      message: ReasonPhrases.OK,
      status: StatusCodes.OK,
      success: true,
    })
  );
};
