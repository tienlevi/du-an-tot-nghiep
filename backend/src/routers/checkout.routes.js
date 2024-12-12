import { Router } from "express";
import { checkoutControllers } from "../controllers/index.js";
import { transactionMiddleware } from "../middleware/transaction.js";

const checkoutRouter = Router();

checkoutRouter.post(
  "/create-checkout-with-vnpay",
  transactionMiddleware,
  checkoutControllers.createPaymentUrlWithVNpay
);
checkoutRouter.get("/vnpay-return", checkoutControllers.vnpayReturn);
checkoutRouter.get("/vnpay-ipn", checkoutControllers.vnpayIPN);

export default checkoutRouter;
