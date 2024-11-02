import Order from "../models/order";
import Cart from "../models/cart";
import { StatusCodes } from "http-status-codes";
import sendEmail from "../middleware/sendEmail";

// Tạo đơn hàng
export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    const sender = await sendEmail(order.email);
    const cartId = await Cart.findOneAndDelete({ userId: req.body.userId });
    return res
      .status(StatusCodes.CREATED)
      .json({ order: order, cartId: cartId, sendEmailTo: sender });
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

export const getOrderByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const order = await Order.find({ userId });
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

export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params; // Lấy orderId từ params
  const { status } = req.body; // Lấy status từ body

  // Kiểm tra xem status có nằm trong danh sách trạng thái hợp lệ hay không
  const validStatuses = ["chờ xử lý", "đã xác nhận", "đang giao", "đã giao"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Trạng thái không hợp lệ." });
  }

  try {
    // Tìm đơn hàng hiện tại để kiểm tra trạng thái
    const currentOrder = await Order.findById(orderId);
    if (!currentOrder) {
      return res.status(404).json({ message: "Đơn hàng không tìm thấy." });
    }

    // Ngăn không cho cập nhật trạng thái nếu đơn hàng đã giao
    if (currentOrder.status === "đã giao") {
      return res.status(400).json({
        message: "Không thể cập nhật trạng thái của đơn hàng đã giao.",
      });
    }

    // Ngăn không cho chuyển từ "đang giao" về "đã xác nhận"
    if (currentOrder.status === "đang giao" && status === "đã xác nhận") {
      return res.status(400).json({
        message: "Không thể chuyển trạng thái từ 'đang giao' về 'đã xác nhận'.",
      });
    }

    // Ngăn không cho chuyển từ "đã xác nhận" hoặc "đang giao" về "chờ xử lý"
    if (
      (currentOrder.status === "đã xác nhận" ||
        currentOrder.status === "đang giao") &&
      status === "chờ xử lý"
    ) {
      return res.status(400).json({
        message:
          "Không thể chuyển trạng thái từ 'đã xác nhận' hoặc 'đang giao' về 'chờ xử lý'.",
      });
    }

    // Tìm và cập nhật trạng thái đơn hàng
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true } // new: true để trả về tài liệu đã cập nhật
    );

    // Trả về đơn hàng đã cập nhật
    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({
      message: "Có lỗi xảy ra khi cập nhật trạng thái đơn hàng.",
      error: error.message,
    });
  }
};
