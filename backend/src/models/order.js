import mongoose from "mongoose";
import { ORDER_STATUS } from "../constants/orderStatus";

const OrderItemSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    size: { type: String, required: true },
    color: { type: String, required: true },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isReviewed: {
      type: Boolean,
      default: false,
    },
    isReviewDisabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
    id: false,
    versionKey: false,
    timestamps: false,
  }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [OrderItemSchema],
    totalPrice: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      default: 0,
    },
    customerInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    receiverInfo: {
      name: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
    },
    shippingAddress: {
      country: {
        type: String,
        default: "Viet Nam",
      },
      province: String,
      district: String,
      address: String,
    },
    paymentMethod: {
      type: String,
      trim: true,
      required: true,
      enum: ["cash", "card"],
      default: "cash",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    canceledBy: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    description: {
      type: String,
    },
    orderStatus: {
      type: String,
      default: ORDER_STATUS.PENDING,
      enum: [Object.values(ORDER_STATUS)],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export default mongoose.model("Order", orderSchema);
