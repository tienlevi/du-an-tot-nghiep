import asyncHandler from "../helpers/asyncHandler.js";
import { voucherServices } from "../services/index.js";

// @Post create a new voucher
export const createVoucher = asyncHandler(async (req, res, next) => {
  return voucherServices.createNewVoucher(req, res, next);
});

// @Get get all vouchers
export const getAllVouchers = asyncHandler(async (req, res, next) => {
  return voucherServices.getAllVouchers(req, res, next);
});

// @Get get detailed voucher
export const getDetailedVoucher = asyncHandler(async (req, res, next) => {
  return voucherServices.getDetailedVoucher(req, res, next);
});

// @Patch update voucher
export const updateVoucher = asyncHandler(async (req, res, next) => {
  return voucherServices.updateVoucher(req, res, next);
});

// @Delete delete voucher
export const deleteVoucher = asyncHandler(async (req, res, next) => {
  return voucherServices.deleteVoucher(req, res, next);
});

// @Post generate 100 vouchers
export const generateVouchers = asyncHandler(async (req, res, next) => {
  const { prefix } = req.body; // Optional prefix for voucher codes
 return voucherServices.generateVouchers(prefix)
  
});
