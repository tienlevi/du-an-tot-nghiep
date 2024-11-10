import { Router } from "express";
import { categoryControllers } from "../controllers/index.js";
import { authenicate } from "../middleware/authenticateMiddleware.js";
import { authorsize } from "../middleware/authorizeMiddleware.js";
import { ROLE } from "../constants/role.js";
import {
  createCategoryValidation,
  updateCategoryValidation,
} from "../validations/category/index.js";

const router = Router();

// @Get
router.get("/all", categoryControllers.getAllCategories);

// @Post
router.post(
  "/",
  authenicate,
  authorsize(ROLE.ADMIN),
  [createCategoryValidation],
  categoryControllers.createCategory
);

// @Patch
router.patch(
  "/:id",
  authenicate,
  authorsize(ROLE.ADMIN),
  [updateCategoryValidation],
  categoryControllers.updateCategory
);

export default router;
