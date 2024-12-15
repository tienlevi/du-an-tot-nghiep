import asyncHandler from "../helpers/asyncHandler.js";
import { myVoucherServices } from "../services/index.js";

export const claimVoucher  = asyncHandler(async (req, res, next) => {
  return myVoucherServices.claimVoucher(req, res, next);
});

export const getAllUserVouchers = asyncHandler(async (req, res, next) => {
  return myVoucherServices.getUserVouchers(req, res, next);
});

export const updateVoucher = asyncHandler(async (req, res, next) => {
  return myVoucherServices.updateVoucherQuantity(req, res, next);
});


