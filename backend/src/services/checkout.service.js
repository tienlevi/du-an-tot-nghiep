import { envConfig } from "../config/env.js";
import generateOrderStatusLog from "../utils/generateOrderStatusLog.js";
import { ORDER_STATUS } from "../constants/orderStatus.js";
import { PAYMENT_METHOD } from "../constants/paymentMethod.js";
import { buildSigned, createVpnUrl } from "../utils/vnpayGenerator.js";
import Order from "../models/order.js";

export const createPaymentUrlWithVNpay = async (req, res, next) => {
  const ipAddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const bankCode = "";
  const locale = "en";
  const totalPrice = req.body.totalPrice;
  const paymentMethod = PAYMENT_METHOD.CARD;
  const datacache = { ...req.body, paymentMethod, totalPrice: totalPrice / 25 };
  const order = await Order.create(datacache);

  const vnpUrl = createVpnUrl({
    ipAddr,
    bankCode,
    locale,
    amount: totalPrice,
    vnPayReturnUrl: envConfig.VN_PAY_CONFIG.vnp_ReturnUrl,
    orderId: order._id.toString(),
  });
  res.status(200).json({ checkout: vnpUrl });
};

export const vnpayReturn = async (req, res, next) => {
  const vnp_Params = req.query;
  console.log(vnp_Params);
  const secureHash = vnp_Params["vnp_SecureHash"];
  const signed = buildSigned(vnp_Params);

  if (secureHash === signed) {
    const data = await Order.findByIdAndUpdate(vnp_Params["vnp_TxnRef"], {
      isPaid: true,
      currentOrderStatus: ORDER_STATUS.CONFIRMED,
      paymentMethod: PAYMENT_METHOD.CARD,
      orderStatusLogs: generateOrderStatusLog({
        statusChangedBy: req.userId,
        orderStatus: ORDER_STATUS.CONFIRMED,
        reason: "User paid by VNPay",
      }),
    });
    res
      .status(200)
      .json({ code: vnp_Params["vnp_ResponseCode"], message: "Success", data });
  } else {
    res.status(400).json({ code: "97" });
  }
};

export const vnpayIpn = async (req, res, next) => {
  const vnp_Params = req.query;
  const secureHash = vnp_Params["vnp_SecureHash"];
  const rspCode = vnp_Params["vnp_ResponseCode"];

  const signed = buildSigned(vnp_Params);
  const paymentStatus = "0";

  const checkOrderId = true;
  const checkAmount = true;
  if (secureHash === signed) {
    if (checkOrderId) {
      if (checkAmount) {
        if (paymentStatus == "0") {
          if (rspCode == "00") {
            await Order.findByIdAndUpdate(vnp_Params["vnp_TxnRef"], {
              isPaid: true,
              currentOrderStatus: ORDER_STATUS.CONFIRMED,
              paymentMethod: PAYMENT_METHOD.CARD,

              OrderStatusLogs: generateOrderStatusLog({
                statusChangedBy: req.userId,
                orderStatus: ORDER_STATUS.CONFIRMED,
                reason: "User paid by VNPay",
              }),
            });

            res.status(200).json({ code: "00", message: "Success" });
          } else {
            await Order.findByIdAndUpdate(vnp_Params["vnp_TxnRef"], {
              isPaid: true,
              orderStatus: ORDER_STATUS.CONFIRMED,
            });
            res.status(200).json({ code: rspCode, message: "Fail" });
          }
        } else {
          res.status(200).json({
            code: "02",
            message: "This order has been updated to the payment status",
          });
        }
      } else {
        res.status(200).json({ code: "04", message: "Amount invalid" });
      }
    } else {
      res.status(200).json({ code: "01", message: "Order not found" });
    }
  } else {
    res.status(200).json({ code: "97", message: "Checksum failed" });
  }
};
