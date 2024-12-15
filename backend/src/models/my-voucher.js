import mongoose from "mongoose";

const MyVoucherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    voucherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Voucher",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "used", "expired"],
      default: "active",
    },
    quantity: {
      type: Number,
      default: 1,
      min: 0, // Nếu 0, không thể sử dụng nữa
    },
    claimedAt: {
      type: Date,
      default: Date.now,
    },
    usedAt: {
      type: Date,
      default: null, // Thời gian sử dụng, nếu chưa sử dụng thì để null
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("MyVoucher", MyVoucherSchema);
