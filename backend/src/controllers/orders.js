import Order from "../models/order";
import Cart from "../models/cart";
import { StatusCodes } from "http-status-codes";

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

    if (order.status === "đã giao" || order.status === "đã hủy") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Không thể cập nhật đơn hàng" });
    }

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
