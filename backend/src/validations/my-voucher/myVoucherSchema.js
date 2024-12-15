import Joi from "joi";

const myVoucherSchema = {
  claimVoucher: Joi.object({
    voucherCode: Joi.string().pattern(/^[A-Za-z0-9-]+$/).min(5).max(20).required().messages({
      "string.base": "Mã voucher phải là chuỗi ký tự.",
      "string.empty": "Mã voucher không được bỏ trống.",
      "string.min": "Mã voucher phải có ít nhất {#limit} ký tự.",
      "string.max": "Mã voucher không được vượt quá {#limit} ký tự.",
      "string.pattern.base": "Mã voucher chỉ bao gồm chữ cái, số và dấu gạch ngang.",
      "any.required": "Mã voucher là bắt buộc.",
    }),
  }),

  updateVoucher: Joi.object({
    voucherId: Joi.string().required().messages({
      "string.base": "Voucher id phải là chuỗi ký tự.",
      "any.required": "Voucher id là bắt buộc.",
    }),
  }),

};

export default myVoucherSchema;
