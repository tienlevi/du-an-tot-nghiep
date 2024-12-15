import { Router } from "express";
import { voucherControllers } from "../controllers/index.js";
import { authenticate } from "../middleware/authenticateMiddleware.js";
import { authorsize } from "../middleware/authorizeMiddleware.js";
import { ROLE } from "../constants/role.js";

import {
  createVoucherValidation,
  updateVoucherValidation,
  generateVouchersValidation
} from "../validations/voucher/index.js";

const router = Router();

// @Get
router.get("/all", voucherControllers.getAllVouchers);
router.get("/:id", voucherControllers.getDetailedVoucher);

// @Post
router.post(
  "/",
  authenticate,
  authorsize(ROLE.ADMIN),
  [createVoucherValidation],
  voucherControllers.createVoucher
);

// @Patch
router.patch(
  "/:id",
  authenticate,
  authorsize(ROLE.ADMIN),
  [updateVoucherValidation],
  voucherControllers.updateVoucher
);

router.delete(
  "/:id",
  authenticate,
  authorsize(ROLE.ADMIN),
  voucherControllers.deleteVoucher
);


// @Post generate 100 vouchers
router.post(
  "/generate",
  authenticate,
  authorsize(ROLE.ADMIN),
  [generateVouchersValidation],
  voucherControllers.generateVouchers
);

export default router;
