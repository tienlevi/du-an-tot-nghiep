import mongoose from "mongoose";
import { ROLE } from "../constants/role.js";

const VoucherSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    minOrderValue: {
      type: Number,
      default: 0,
    },
    applicableCategories: [
      {
        type: String,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // Nếu null, áp dụng cho mọi người dùng
    },
    userRole: {
      type: String,
      enum: Object.values(ROLE),
      default: null, // Nếu null, áp dụng cho mọi vai trò
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 0, // Nếu 0, không thể sử dụng nữa
    },
    status: {
      type: String,
      enum: ["active", "expired", "used"],
      default: "active",
    },
    createdBy: {
      type: String,
      default: "Admin",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("Voucher", VoucherSchema);
