import { Router } from "express";
import { myVoucherControllers } from "../controllers/index.js";
import { authenticate } from "../middleware/authenticateMiddleware.js";

import {
  claimVoucherValidation,
  updateVoucherValidation
} from "../validations/my-voucher/index.js";

const router = Router();

// @Get
router.get("/all", myVoucherControllers.getAllUserVouchers);

// @Post
router.post(
  "/claim",
  authenticate,
  [claimVoucherValidation],
  myVoucherControllers.claimVoucher
);

router.post(
  "/",
  authenticate,
  [updateVoucherValidation],
  myVoucherControllers.updateVoucher
);




export default router;
