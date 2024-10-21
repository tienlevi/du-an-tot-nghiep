import { Router } from "express";
import { paymentVnpay } from "../controllers/payment";

const router = Router();

router.post("/payment", paymentVnpay);

export default router;
