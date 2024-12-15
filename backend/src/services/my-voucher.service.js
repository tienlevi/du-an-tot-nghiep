import MyVoucher from "../models/my-voucher.js";
import Voucher from "../models/voucher.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import customResponse from "../helpers/response.js";
import jwt from "jsonwebtoken";

/**
 * Extract user ID from the Authorization header token.
 * @param {Object} req - Express request object.
 * @returns {String|null} - User ID or null if invalid.
 */
const extractUserIdFromToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken.userId;
  } catch {
    return null;
  }
};

/**
 * Handle voucher validation.
 * @param {Object} voucher - Voucher object.
 * @returns {String|null} - Error message if validation fails, otherwise null.
 */
const validateVoucher = (voucher) => {
  if (!voucher) return "Không tìm thấy Voucher.";
  const now = new Date();
  if (voucher.status !== "active" || now < voucher.startDate || now > voucher.endDate) {
    return "Voucher không hợp lệ hoặc đã hết hạn.";
  }
  if (voucher.quantity <= 0) return "Voucher đã hết.";
  return null;
};

/**
 * Claim a voucher for a user.
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} The newly claimed voucher record.
 */
export const claimVoucher = async (req, res) => {
  try {
    const userId = extractUserIdFromToken(req);
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json(
        customResponse({
          data: null,
          message: "Token không hợp lệ hoặc đã hết hạn.",
          status: StatusCodes.UNAUTHORIZED,
          success: false,
        })
      );
    }

    const { voucherCode } = req.body;

    const voucher = await Voucher.findOne({ code: voucherCode });
    const validationError = validateVoucher(voucher);
    if (validationError) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        customResponse({
          data: null,
          message: validationError,
          status: StatusCodes.BAD_REQUEST,
          success: false,
        })
      );
    }

    const existingClaim = await MyVoucher.findOne({ userId, voucherId: voucher._id });
    if (existingClaim) {
      return res.status(StatusCodes.CONFLICT).json(
        customResponse({
          data: null,
          message: "Bạn đã nhận Voucher này.",
          status: StatusCodes.CONFLICT,
          success: false,
        })
      );
    }

    // Update voucher quantity and status
    voucher.quantity -= 1;
    if (voucher.quantity === 0) voucher.status = "expired";
    await voucher.save();

    // Create a new MyVoucher record
    const myVoucher = await MyVoucher.create({ userId, voucherId: voucher._id });

    return res.status(StatusCodes.OK).json(
      customResponse({
        data: myVoucher,
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
        success: true,
      })
    );
  } catch (error) {
    console.error("Error claiming voucher:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      customResponse({
        data: null,
        message: "Đã xảy ra lỗi khi nhận voucher.",
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
      })
    );
  }
};

/**
 * Get all vouchers claimed by a user.
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} List of vouchers claimed by the user.
 */
export const getUserVouchers = async (req, res) => {
  try {
    const userId = extractUserIdFromToken(req);
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json(
        customResponse({
          data: null,
          message: "Token không hợp lệ hoặc đã hết hạn.",
          status: StatusCodes.UNAUTHORIZED,
          success: false,
        })
      );
    }

    const myVouchers = await MyVoucher.find({ userId, status: "active" })
      .populate("voucherId")
      .exec();

    return res.status(StatusCodes.OK).json(
      customResponse({
        data: myVouchers,
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
        success: true,
      })
    );
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      customResponse({
        data: null,
        message: "Đã xảy ra lỗi khi lấy danh sách voucher.",
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
      })
    );
  }
};

/**
 * Update the quantity of a voucher for a user by decrementing the quantity in MyVoucher.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Updated MyVoucher record.
 */
export const updateVoucherQuantity = async (req, res) => {
  try {
    const userId = extractUserIdFromToken(req);
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).json(
        customResponse({
          data: null,
          message: "Token không hợp lệ hoặc đã hết hạn.",
          status: StatusCodes.UNAUTHORIZED,
          success: false,
        })
      );
    }

    const { voucherId } = req.body;

    // Find the MyVoucher record for the user and voucherId
    const myVoucher = await MyVoucher.findOne({ userId, _id: voucherId });

    if (!myVoucher) {
      return res.status(StatusCodes.NOT_FOUND).json(
        customResponse({
          data: null,
          message: "Voucher này chưa được người dùng nhận.",
          status: StatusCodes.NOT_FOUND,
          success: false,
        })
      );
    }

    // Check if the voucher quantity in MyVoucher is greater than 0
    if (myVoucher.quantity <= 0) {
      return res.status(StatusCodes.BAD_REQUEST).json(
        customResponse({
          data: null,
          message: "Voucher đã hết hoặc không thể sử dụng nữa.",
          status: StatusCodes.BAD_REQUEST,
          success: false,
        })
      );
    }

    // Decrease the quantity in MyVoucher by 1
    myVoucher.quantity -= 1;

    // If quantity reaches 0, mark it as 'used'
    if (myVoucher.quantity === 0) {
      myVoucher.status = "used"; // Update the status to 'used' if quantity reaches 0
    }

    // Save the updated MyVoucher record
    await myVoucher.save();

    return res.status(StatusCodes.OK).json(
      customResponse({
        data: myVoucher,
        message: "Cập nhật số lượng voucher thành công.",
        status: StatusCodes.OK,
        success: true,
      })
    );
  } catch (error) {
    console.error("Error updating voucher quantity:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      customResponse({
        data: null,
        message: "Đã xảy ra lỗi khi cập nhật số lượng voucher.",
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        success: false,
      })
    );
  }
};