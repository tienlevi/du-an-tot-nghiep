import Voucher from "../models/voucher.js";
import MyVoucher from "../models/my-voucher.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import customResponse from "../helpers/response.js";
import handleQuery from "../utils/handleQuery.js";
import crypto from "crypto";

// @Post create a new voucher
export const createNewVoucher = async (req, res, next) => {
  try {
    const voucher = await Voucher.create(req.body);

    return res.status(StatusCodes.CREATED).json(
      customResponse({
        data: voucher,
        message: ReasonPhrases.CREATED,
        status: StatusCodes.CREATED,
        success: true,
      })
    );
  } catch (error) {
    next(error);
  }
};

// @Get get all vouchers
export const getAllVouchers = async (req, res, next) => {
  try {
    const { data, page, totalDocs, totalPages } = await handleQuery(req, Voucher);

    return res.status(StatusCodes.OK).json(
      customResponse({
        data: {
          vouchers: data,
          page,
          totalDocs,
          totalPages,
        },
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
        success: true,
      })
    );
  } catch (error) {
    next(error);
  }
};

// @Get get detailed voucher
export const getDetailedVoucher = async (req, res, next) => {
  try {
    const voucher = await Voucher.findById(req.params.id).lean();

    if (!voucher) {
      return res.status(StatusCodes.NOT_FOUND).json(
        customResponse({
          data: null,
          message: ReasonPhrases.NOT_FOUND,
          status: StatusCodes.NOT_FOUND,
          success: false,
        })
      );
    }

    return res.status(StatusCodes.OK).json(
      customResponse({
        data: voucher,
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
        success: true,
      })
    );
  } catch (error) {
    next(error);
  }
};

// @Post update voucher
export const updateVoucher = async (req, res, next) => {
  try {
    const updatedVoucher = await Voucher.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );

    if (!updatedVoucher) {
      return res.status(StatusCodes.NOT_FOUND).json(
        customResponse({
          data: null,
          message: ReasonPhrases.NOT_FOUND,
          status: StatusCodes.NOT_FOUND,
          success: false,
        })
      );
    }

    return res.status(StatusCodes.OK).json(
      customResponse({
        data: updatedVoucher,
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
        success: true,
      })
    );
  } catch (error) {
    next(error);
  }
};

// @Delete delete voucher
export const deleteVoucher = async (req, res, next) => {
  try {
    const deletedVoucher = await Voucher.findByIdAndDelete(req.params.id);

    if (!deletedVoucher) {
      return res.status(StatusCodes.NOT_FOUND).json(
        customResponse({
          data: null,
          message: ReasonPhrases.NOT_FOUND,
          status: StatusCodes.NOT_FOUND,
          success: false,
        })
      );
    }

    // Xóa tài liệu liên quan trong MyVoucher
    await MyVoucher.deleteMany({ "voucherId._id": req.params.id });

    return res.status(StatusCodes.OK).json(
      customResponse({
        data: deletedVoucher,
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
        success: true,
      })
    );
  } catch (error) {
    next(error);
  }
};
export const generateVouchers = async (prefix = "VC") => {
  const vouchers = [];
  const now = new Date();
  const oneMonthLater = new Date();
  oneMonthLater.setMonth(now.getMonth() + 1);

  for (let i = 0; i < 10; i++) {
    const discountType = Math.random() < 0.5 ? "percentage" : "fixed"; // Randomly choose discountType
    const discountValue =
      discountType === "percentage"
        ? Math.floor(Math.random() * 20) + 10 // Random percentage between 10-30%
        : Math.floor(Math.random() * 50000) + 10000; // Random fixed discount between 10,000-60,000 (e.g., VND)

    const uniqueCode = `${prefix}-${crypto.randomBytes(4).toString("hex")}`;
    vouchers.push({
      code: uniqueCode,
      description: "Automatically generated voucher",
      discountType,
      discountValue,
      minOrderValue: 0,
      applicableCategories: [],
      userRole: null,
      startDate: now,
      endDate: oneMonthLater,
      createdBy: "Admin",
      status: "active",
      quantity: 1,
    });
  }

  const savedVouchers = await Voucher.insertMany(vouchers);
 

  return res.status(StatusCodes.OK).json(
    customResponse({
      data: savedVouchers,
      message: ReasonPhrases.OK,
      status: StatusCodes.OK,
      success: true,
    })
  );
};