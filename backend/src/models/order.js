import mongoose from "mongoose";

// Hàm để sinh orderId
const generateOrderId = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${timestamp}-${random}`;
};

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
});

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Nếu bạn có một schema User để liên kết
    },
    items: {
      type: [orderItemSchema],
      required: true,
    },
    email: { type: String, required: true }, // Yêu cầu email
    name: { type: String, required: true },
    address: { type: String, required: true }, // Yêu cầu địa chỉ
    totalPrice: {
      type: Number,
      required: true,
    },
    phone: { type: String, required: true }, // Yêu cầu số điện thoại
    status: {
      type: String,
      enum: ["chờ xử lý", "đã xác nhận", "đang giao", "đã giao"],
      default: "chờ xử lý",
    },
  },
  { timestamps: true, versionKey: false }
);

// Tạo pre-save hook để sinh orderId trước khi lưu vào cơ sở dữ liệu
orderSchema.pre("save", function (next) {
  if (!this.orderId) {
    this.orderId = generateOrderId();
  }
  next();
});

export default mongoose.model("Order", orderSchema);
