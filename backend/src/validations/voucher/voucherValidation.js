import { BadRequestError } from "../../errors/customError.js";
import Voucher from "../../models/voucher.js";
import validator from "../validator.js";
import { voucherSchema } from "./index.js";

export const createVoucherValidation = async (req, res, next) => {
  const { code } = req.body;

  // Kiểm tra mã voucher đã tồn tại hay chưa
  const checkUniqueCode = await Voucher.findOne({ code }).select("_id").lean();

  if (checkUniqueCode) {
    return next(new BadRequestError("Mã voucher đã tồn tại!"));
  }

  // Xác thực schema
  return validator(voucherSchema.createVoucher, req.body, next);
};

export const updateVoucherValidation = async (req, res, next) => {
  const { code } = req.body;
  const { id } = req.params;

  // Kiểm tra mã voucher đã tồn tại, bỏ qua nếu trùng chính voucher hiện tại
  const checkUniqueCode = await Voucher.findOne({ code }).select("_id").lean();

  if (checkUniqueCode && id !== checkUniqueCode._id.toString()) {
    return next(new BadRequestError("Mã voucher đã tồn tại!"));
  }

  // Xác thực schema
  return validator(voucherSchema.updateVoucher, req.body, next);
};

export const generateVouchersValidation = async (req, res, next) => {
  const { prefix } = req.body;

  // Check if prefix is already used in existing voucher codes
  if (prefix) {
    const duplicatePrefix = await Voucher.findOne({
      code: { $regex: `^${prefix}-` },
    })
      .select("_id")
      .lean();

    if (duplicatePrefix) {
      return next(
        new BadRequestError(
          `Prefix "${prefix}" is already used in existing voucher codes!`
        )
      );
    }
  }

  // Validate the request body using Joi
  return validator(voucherSchema.generateVouchers, req.body, next);
};


