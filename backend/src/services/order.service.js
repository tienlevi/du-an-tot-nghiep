import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotAcceptableError,
  NotFoundError,
} from "../errors/customError.js";
import Order from "../models/order.js";
import APIQuery from "../utils/APIQuery.js";
import customResponse from "../helpers/response.js";
import { inventoryService } from "./index.js";
import { ORDER_STATUS } from "../constants/orderStatus.js";
import { ROLE } from "../constants/role.js";
import mongoose from "mongoose";

// @GET:  Get all orders
export const getAllOrders = async (req, res, next) => {
  const page = req.query.page ? +req.query.page : 1;
  req.query.limit = String(req.query.limit || 10);
  const searchString = req.query.rawsearch;
  const searchQuery = searchString
    ? { "customerInfo.name": { $regex: searchString, $options: "i" } }
    : {};
  const features = new APIQuery(Order.find(searchQuery), req.query);
  features.filter().sort().limitFields().search().paginate();

  const [orders, totalDocs] = await Promise.all([
    features.query,
    features.count(),
  ]);
  const totalPages = Math.ceil(Number(totalDocs) / +req.query.limit);

  return res.status(StatusCodes.OK).json(
    customResponse({
      data: {
        orders,
        page,
        totalDocs,
        totalPages,
      },
      success: true,
      status: StatusCodes.OK,
      message: ReasonPhrases.OK,
    })
  );
};

//@GET: Get all orders by user
export const getAllOrdersByUser = async (req, res, next) => {
  const userId = new mongoose.Types.ObjectId(req.userId);
  const page = req.query.page ? +req.query.page : 1;
  req.query.limit = Number(req.query.limit || 10);
  req.query.userId;

  const features = new APIQuery(Order.find({}), req.query);
  features.filter().sort().limitFields().search().paginate();

  const [orders, totalDocs] = await Promise.all([
    features.query,
    features.count(),
  ]);
  const tets = await Order.find({ userId });
  return res.status(StatusCodes.OK).json(
    customResponse({
      data: {
        orders,
        page,
        totalDocs,
      },
      success: true,
      status: StatusCodes.OK,
      message: ReasonPhrases.OK,
    })
  );
};

//@GET: Get the detailed order
export const getDetailedOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id).lean();

  if (!order) {
    throw new NotFoundError(
      `${ReasonPhrases.NOT_FOUND} order with id: ${req.params.id}`
    );
  }

  return res.status(StatusCodes.OK).json(
    customResponse({
      data: order,
      success: true,
      status: StatusCodes.OK,
      message: ReasonPhrases.OK,
    })
  );
};

// @POST: Create new order
export const createOrder = async (req, res, next) => {
  const order = new Order({
    ...req.body,
    userId: req.userId,
  });
  //   Update stock
  await inventoryService.updateStockOnCreateOrder(req.body.items);

  // await Promise.all(
  //   req.body.items.map(async (product) => {
  //     await Cart.findOneAndUpdate(
  //       { userId: req.userId },
  //       {
  //         $pull: {
  //           items: { product: product.productId, variant: product.variantId },
  //         },
  //       },
  //       { new: true }
  //     );
  //   })
  // );
  await order.save();
  return res.status(StatusCodes.OK).json(
    customResponse({
      data: order,
      success: true,
      status: StatusCodes.OK,
      message: ReasonPhrases.OK,
    })
  );
};

//@POST Set order status to cancelled
export const cancelOrder = async (req, res, next) => {
  const foundedOrder = await Order.findOne({ _id: req.body.orderId });

  if (!foundedOrder) {
    throw new BadRequestError(`Not found order with id ${req.body.orderId}`);
  }

  if (foundedOrder.orderStatus === ORDER_STATUS.CANCELLED) {
    throw new NotAcceptableError(
      `You cannot cancel this order because it was cancelled before. `
    );
  }

  if (
    foundedOrder.orderStatus !== ORDER_STATUS.DELIVERED &&
    foundedOrder.orderStatus !== ORDER_STATUS.DONE
  ) {
    if (
      req.role !== ROLE.ADMIN &&
      foundedOrder.orderStatus !== ORDER_STATUS.PENDING
    ) {
      throw new NotAcceptableError(
        "Bạn không được phép hủy đơn vui lòng liên hệ nếu có vấn đề"
      );
    }
    if (req.role === ROLE.ADMIN) {
      foundedOrder.canceledBy = ROLE.ADMIN;
    }

    foundedOrder.orderStatus = ORDER_STATUS.CANCELLED;
    foundedOrder.description = req.body.description ?? "";
    foundedOrder.save();

    // Update stock
    await inventoryService.updateStockOnCancelOrder(foundedOrder.items);
  } else {
    throw new NotAcceptableError(
      `Đơn hàng của bạn đã được giao không thể hủy đơn`
    );
  }

  return res.status(StatusCodes.OK).json(
    customResponse({
      data: null,
      success: true,
      status: StatusCodes.OK,
      message: "Your order is cancelled.",
    })
  );
};

// @Set order status to confirmed
export const confirmOrder = async (req, res, next) => {
  if (!req.role || req.role !== "admin") {
    throw new NotAcceptableError("Only admin can access.");
  }

  const foundedOrder = await Order.findOne({ _id: req.body.orderId });

  if (!foundedOrder) {
    throw new BadRequestError(`Not found order with id ${req.body.orderId}`);
  }

  if (foundedOrder.orderStatus === ORDER_STATUS.PENDING) {
    foundedOrder.orderStatus = ORDER_STATUS.CONFIRMED;
    foundedOrder.save();
  } else {
    throw new BadRequestError(`Your order is confirmed.`);
  }

  return res.status(StatusCodes.OK).json(
    customResponse({
      data: null,
      success: true,
      status: StatusCodes.OK,
      message: "Your order is confirmed.",
    })
  );
};

// @Set order status to shipping
export const shippingOrder = async (req, res, next) => {
  if (!req.role || req.role !== "admin") {
    throw new NotAcceptableError("Only admin can access.");
  }

  const foundedOrder = await Order.findOne({
    _id: req.body.orderId,
  });

  if (!foundedOrder) {
    throw new BadRequestError(`Not found order with id ${req.body.orderId}`);
  }

  if (foundedOrder.orderStatus === ORDER_STATUS.CONFIRMED) {
    foundedOrder.orderStatus = ORDER_STATUS.SHIPPING;
    await foundedOrder.save();
  } else {
    throw new BadRequestError(`Your order is not confirmed.`);
  }

  return res.status(StatusCodes.OK).json(
    customResponse({
      data: null,
      success: true,
      status: StatusCodes.OK,
      message: "Your order is on delivery.",
    })
  );
};

// @ Set order status to delivered
export const deliverOrder = async (req, res, next) => {
  if (!req.role || req.role !== "admin") {
    throw new NotAcceptableError("Only admin can access.");
  }

  const foundedOrder = await Order.findOne({ _id: req.body.orderId });

  if (!foundedOrder) {
    throw new BadRequestError(`Not found order with id ${req.body.orderId}`);
  }

  if (foundedOrder.orderStatus === ORDER_STATUS.SHIPPING) {
    foundedOrder.orderStatus = ORDER_STATUS.DELIVERED;
    foundedOrder.save();
  } else {
    throw new BadRequestError(`Your order is delivered.`);
  }

  return res.status(StatusCodes.OK).json(
    customResponse({
      data: null,
      success: true,
      status: StatusCodes.OK,
      message: "This order is delivered.",
    })
  );
};

// @Set order status to done
export const finishOrder = async (req, res, next) => {
  const foundedOrder = await Order.findOne({ _id: req.body.orderId });

  if (!foundedOrder) {
    throw new BadRequestError(`Not found order with id ${req.body.orderId}`);
  }

  if (foundedOrder.orderStatus === ORDER_STATUS.DELIVERED) {
    foundedOrder.orderStatus = ORDER_STATUS.DONE;
    foundedOrder.isPaid = true;
    foundedOrder.save();
  } else {
    throw new BadRequestError(`Your order is done.`);
  }

  return res.status(StatusCodes.OK).json(
    customResponse({
      data: null,
      success: true,
      status: StatusCodes.OK,
      message: "Your order is done.",
    })
  );
};
