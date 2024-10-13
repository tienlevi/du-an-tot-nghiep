import mongoose from "mongoose";

// Hàm để sinh orderNumber
const generateOrderNumber = () => {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
    return `${timestamp}-${random}`;
};

const orderItemSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    items: [orderItemSchema],
    orderNumber: {
        type: String,
        unique: true,
    },
    customerName: {
        type: String,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["Đang chờ xử lý", "Đã xác nhận", "Đã giao hàng", "Đã giao", "Đã hủy", "Đã xử lý"], // Thêm trạng thái mới
        default: "Đang chờ xử lý", // Trạng thái mặc định
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Tạo pre-save hook để sinh orderNumber trước khi lưu vào cơ sở dữ liệu
orderSchema.pre("save", function (next) {
    if (!this.orderNumber) {
        this.orderNumber = generateOrderNumber();
    }
    next();
});

export default mongoose.model("Order", orderSchema);
