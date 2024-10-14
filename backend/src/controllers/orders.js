import Order from "../models/order";
import Cart from "../models/cart";
import { StatusCodes } from "http-status-codes";

// Tạo đơn hàng
export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    const cartId = await Cart.findOneAndDelete({ userId: req.body.userId });
    return res
      .status(StatusCodes.CREATED)
      .json({ order: order, cartId: cartId });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// Lấy danh sách tất cả đơn hàng
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (orders.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Không tìm thấy đơn hàng" });
    }
    return res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// Lấy thông tin đơn hàng theo ID
export const getOrderById = async (req, res) => {
  try {
    const { userId, orderId } = req.params;
    const order = await Order.findOne({ userId, _id: orderId });
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Không tìm thấy đơn hàng" });
    }
    return res.status(StatusCodes.OK).json(order);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// Cập nhật đơn hàng
export const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOneAndUpdate({ _id: orderId }, req.body, {
      new: true,
    });
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Không tìm thấy đơn hàng" });
    }
    return res.status(StatusCodes.OK).json(order);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// Cập nhật trạng thái đơn hàng
// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatus = [
      "chờ xử lý",
      "đã xác nhận",
      "đang giao",
      "đã giao",
      "đã hủy",
    ];

    if (!validStatus.includes(status)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Trạng thái không hợp lệ" });
    }

    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Không tìm thấy đơn hàng" });
    }

    // Nếu trạng thái là "đã giao" hoặc "đã hủy", không cho phép cập nhật
    if (order.status === "đã giao" || order.status === "đã hủy") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Không thể cập nhật trạng thái của đơn hàng này" });
    }

    // Cập nhật trạng thái
    order.status = status;
    await order.save();

    return res
      .status(StatusCodes.OK)
      .json({ message: "Trạng thái đơn hàng đã được cập nhật thành công" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// Hủy đơn hàng
// Hủy đơn hàng
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Không tìm thấy đơn hàng" });
    }
    
    if (order.status === "đã giao" || order.status === "đã hủy") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Không thể hủy đơn hàng" });
    }

    // Cập nhật trạng thái đơn hàng thành đã hủy
    order.status = "đã hủy";
    await order.save();

    return res
      .status(StatusCodes.OK)
      .json({ message: "Đơn hàng đã được hủy thành công" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

