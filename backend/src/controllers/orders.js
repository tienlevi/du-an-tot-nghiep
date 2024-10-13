import Order from "../models/order.js";
import { StatusCodes } from "http-status-codes";

export const createOrder = async (req, res) => {
    try {
        const { userId, items, totalPrice, customerInfo } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!userId || !items || !totalPrice || !customerInfo) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Thiếu thông tin trong yêu cầu" });
        }

        const order = await Order.create({ userId, items, totalPrice, customerInfo });
        return res.status(StatusCodes.CREATED).json(order);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        if (!orders.length) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Không tìm thấy đơn hàng nào" });
        }
        return res.status(StatusCodes.OK).json(orders);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { userId, orderId } = req.params;
        const order = await Order.findOne({ userId, _id: orderId });
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Đơn hàng không tồn tại" });
        }
        return res.status(StatusCodes.OK).json(order);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findOneAndUpdate({ _id: orderId }, req.body, { new: true });
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Đơn hàng không tồn tại" });
        }
        return res.status(StatusCodes.OK).json(order);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        // Mảng trạng thái hợp lệ
        const validStatus = [
            "đang chờ xử lý",
            "đã xác nhận",
            "đã giao hàng",
            "đã giao",
            "đã hủy",
            "đã xử lý"
        ];

        // Kiểm tra trạng thái có hợp lệ không
        if (!validStatus.includes(status)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Trạng thái không hợp lệ" });
        }

        const order = await Order.findOne({ _id: orderId });
        if (!order) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Đơn hàng không tồn tại" });
        }

        // Kiểm tra xem đơn hàng có thể được cập nhật hay không
        if (["đã giao", "đã hủy"].includes(order.status)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Đơn hàng không thể được cập nhật" });
        }

        // Cập nhật trạng thái đơn hàng
        order.status = status;
        await order.save();

        return res.status(StatusCodes.OK).json({ message: "Cập nhật trạng thái đơn hàng thành công" });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};

export const getOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params; // Lấy userId từ URL params
        if (!userId) {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "User ID là bắt buộc" });
        }

        const orders = await Order.find({ userId });
        if (!orders.length) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "Không tìm thấy đơn hàng nào cho người dùng này" });
        }

        return res.status(StatusCodes.OK).json(orders);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
};
