import { BadRequestError } from "../../errors/customError.js";
import Voucher from "../../models/voucher.js";
import MyVoucher from "../../models/my-voucher.js";
import validator from "../validator.js";
import { myVoucherSchema } from "./index.js";

export const claimVoucherValidation = async (req, res, next) => {
  const { voucherCode } = req.body;

  const voucher = await Voucher.findOne({ code: voucherCode }).lean();
  
  if (!voucher) {
    return next(new BadRequestError("Voucher không tồn tại."));
  }

  return validator(myVoucherSchema.claimVoucher, req.body, next);
};

export const updateVoucherValidation = async (req, res, next) => {
  const { voucherId } = req.body;

  console.log('voucherId', voucherId);

  const voucher = await MyVoucher.findById(voucherId).lean();
  console.log('voucher', voucher);
  
  if (!voucher) {
    return next(new BadRequestError("Voucher không tồn tại."));
  }
  // Validate the request body using a schema
  return validator(myVoucherSchema.updateVoucher, req.body, next);
};