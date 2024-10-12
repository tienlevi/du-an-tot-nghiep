import mongoose from "mongoose";

// Hàm để sinh orderNumber
// const generateOrderNumber = () => {
//   const timestamp = Date.now().toString();
//   const random = Math.floor(Math.random() * 1000)
//     .toString()
//     .padStart(3, "0");
//   return `${timestamp}-${random}`;
// };

const orderItemSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  image: { type: String },
});

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    items: [orderItemSchema],
    email: { type: String },
    name: {
      type: String,
      // required: true,
    },
    address: { type: String },
    totalPrice: {
      type: Number,
      required: true,
    },
    phone: { type: String },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true, versionKey: false }
);
// Tạo pre-save hook để sinh orderNumber trước khi lưu vào cơ sở dữ liệu
// orderSchema.pre("save", function (next) {
//   if (!this.orderNumber) {
//     this.orderNumber = generateOrderNumber();
//   }
//   next();
// });
export default mongoose.model("Order", orderSchema);
