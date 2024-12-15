import Joi from "joi";

const voucherSchema = {
  createVoucher: Joi.object({
    code: Joi.string().pattern(/^[A-Za-z0-9-]+$/).min(5).max(20).required().messages({
      "string.base": "Mã voucher phải là chuỗi ký tự.",
      "string.empty": "Mã voucher không được bỏ trống.",
      "string.min": "Mã voucher phải có ít nhất {#limit} ký tự.",
      "string.max": "Mã voucher không được vượt quá {#limit} ký tự.",
      "string.pattern.base": "Mã voucher chỉ bao gồm chữ cái, số và dấu gạch ngang.",
      "any.required": "Mã voucher là bắt buộc.",
    }),
    description: Joi.string().allow("").optional().messages({
      "string.base": "Mô tả phải là chuỗi ký tự.",
    }),
    discountType: Joi.string().valid("percentage", "fixed").required().messages({
      "any.only": "Loại giảm giá phải là 'percentage' hoặc 'fixed'.",
      "any.required": "Loại giảm giá là bắt buộc.",
    }),
    discountValue: Joi.number()
      .min(1)
      .max(100)
      .when('discountType', {
        is: 'fixed',
        then: Joi.number().max(100000),
        otherwise: Joi.number().max(100)
      })
      .required()
      .messages({
        "number.base": "Giá trị giảm giá phải là số.",
        "number.min": "Giá trị giảm giá phải lớn hơn hoặc bằng {#limit}.",
        "number.max": "Giá trị giảm giá phải nhỏ hơn hoặc bằng {#limit}.",
        "any.required": "Giá trị giảm giá là bắt buộc.",
      }),
    minOrderValue: Joi.number().min(0).required().messages({
      "number.base": "Giá trị đơn hàng tối thiểu phải là số.",
      "number.min": "Giá trị đơn hàng tối thiểu không được nhỏ hơn {#limit}.",
      "any.required": "Giá trị đơn hàng tối thiểu là bắt buộc.",
    }),
    applicableCategories: Joi.array().items(Joi.string()).optional().messages({
      "array.base": "Danh mục áp dụng phải là một mảng.",
    }),
    userId: Joi.string().allow(null).optional().messages({
      "string.base": "ID người dùng phải là chuỗi ký tự hoặc null.",
    }),
    userRole: Joi.string().allow(null).optional().messages({
      "string.base": "Vai trò người dùng phải là chuỗi ký tự hoặc null.",
    }),
    startDate: Joi.date().required().messages({
      "date.base": "Ngày bắt đầu phải là định dạng ngày.",
      "any.required": "Ngày bắt đầu là bắt buộc.",
    }),
    endDate: Joi.date().greater(Joi.ref("startDate")).required().messages({
      "date.base": "Ngày kết thúc phải là định dạng ngày.",
      "date.greater": "Ngày kết thúc phải sau ngày bắt đầu.",
      "any.required": "Ngày kết thúc là bắt buộc.",
    }),
    quantity: Joi.number().min(1).required().messages({
      "number.base": "Số lượng phải là số.",
      "number.min": "Số lượng phải lớn hơn hoặc bằng {#limit}.",
      "any.required": "Số lượng là bắt buộc.",
    }),
    status: Joi.string().valid("active", "used", 'expired').required().messages({
      "any.only": "Trạng thái phải là 'active' hoặc 'expired hoặc used'.",
      "any.required": "Trạng thái là bắt buộc.",
    }),
    createdBy: Joi.string().allow("").optional().messages({
      "string.base": "Người tạo phải là chuỗi ký tự.",
    }),
  }),

  updateVoucher: Joi.object({
    code: Joi.string().pattern(/^[A-Za-z0-9-]+$/).min(5).max(20).messages({
      "string.base": "Mã voucher phải là chuỗi ký tự.",
      "string.empty": "Mã voucher không được bỏ trống.",
      "string.min": "Mã voucher phải có ít nhất {#limit} ký tự.",
      "string.max": "Mã voucher không được vượt quá {#limit} ký tự.",
      "string.pattern.base": "Mã voucher chỉ bao gồm chữ cái, số và dấu gạch ngang.",
    }),
    description: Joi.string().allow("").optional().messages({
      "string.base": "Mô tả phải là chuỗi ký tự.",
    }),
    discountType: Joi.string().valid("percentage", "fixed").messages({
      "any.only": "Loại giảm giá phải là 'percentage' hoặc 'fixed'.",
    }),
    discountValue: Joi.number()
      .min(1)
      .max(100)
      .when('discountType', {
        is: 'fixed',
        then: Joi.number().max(100000),
        otherwise: Joi.number().max(100)
      })
      .required()
      .messages({
        "number.base": "Giá trị giảm giá phải là số.",
        "number.min": "Giá trị giảm giá phải lớn hơn hoặc bằng {#limit}.",
        "number.max": "Giá trị giảm giá phải nhỏ hơn hoặc bằng {#limit}.",
        "any.required": "Giá trị giảm giá là bắt buộc.",
      }),
    minOrderValue: Joi.number().min(0).messages({
      "number.base": "Giá trị đơn hàng tối thiểu phải là số.",
      "number.min": "Giá trị đơn hàng tối thiểu không được nhỏ hơn {#limit}.",
    }),
    applicableCategories: Joi.array().items(Joi.string()).messages({
      "array.base": "Danh mục áp dụng phải là một mảng.",
    }),
    userId: Joi.string().allow(null).messages({
      "string.base": "ID người dùng phải là chuỗi ký tự hoặc null.",
    }),
    userRole: Joi.string().allow(null).messages({
      "string.base": "Vai trò người dùng phải là chuỗi ký tự hoặc null.",
    }),
    startDate: Joi.date().messages({
      "date.base": "Ngày bắt đầu phải là định dạng ngày.",
    }),
    endDate: Joi.date().greater(Joi.ref("startDate")).messages({
      "date.base": "Ngày kết thúc phải là định dạng ngày.",
      "date.greater": "Ngày kết thúc phải sau ngày bắt đầu.",
    }),
    quantity: Joi.number().min(1).messages({
      "number.base": "Số lượng phải là số.",
      "number.min": "Số lượng phải lớn hơn hoặc bằng {#limit}.",
    }),
    status: Joi.string().valid("active", "used", 'expired').required().messages({
      "any.only": "Trạng thái phải là 'active' hoặc 'expired hoặc used'.",
      "any.required": "Trạng thái là bắt buộc.",
    }),
    createdBy: Joi.string().allow("").optional().messages({
      "string.base": "Người tạo phải là chuỗi ký tự.",
    }),
  }),

  generateVouchers: Joi.object({
    prefix: Joi.string()
      .alphanum()
      .max(10)
      .optional()
      .messages({
        "string.base": "Prefix must be a string.",
        "string.alphanum": "Prefix can only contain letters and numbers.",
        "string.max": "Prefix must be at most {#limit} characters long.",
      }),
  }),
};

export default voucherSchema;
