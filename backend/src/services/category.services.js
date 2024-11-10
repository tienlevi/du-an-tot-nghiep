import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/customError.js";
import customResponse from "../helpers/response.js";
import APIQuery from "../utils/APIQuery.js";
import category from "../models/category.js";

// @Post create new category
export const createNewCategory = async (req, res, next) => {
  const newCategory = await category.create(req.body);

  return res.status(StatusCodes.CREATED).json(
    customResponse({
      data: newCategory,
      status: StatusCodes.CREATED,
      message: ReasonPhrases.OK,
      success: true,
    })
  );
};

// @Get get all categories
export const getAllCategories = async (req, res, next) => {
  const page = req.query.page ? +req.query.page : 1;
  req.query.limit = String(req.query.limit || 10);

  const features = new APIQuery(category.find({}), req.query);
  features.filter().sort().limitFields().search().paginate();
  const [categories, totalDocs] = await Promise.all([
    features.query,
    features.count(),
  ]);
  const totalPages = Math.ceil(totalDocs / +req.query.limit);

  return res.status(StatusCodes.OK).json(
    customResponse({
      data: {
        categories,
        page,
        totalDocs,
        totalPages,
      },
      status: StatusCodes.OK,
      message: ReasonPhrases.OK,
      success: true,
    })
  );
};

// @Patch edit category
export const updateCategory = async (req, res, next) => {
  const foundedCategory = await category
    .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .lean();

  if (!foundedCategory) {
    throw new BadRequestError("Danh mục không tồn tại!");
  }

  return res.status(StatusCodes.OK).json(
    customResponse({
      data: { category: foundedCategory },
      status: StatusCodes.OK,
      message: ReasonPhrases.OK,
      success: true,
    })
  );
};
