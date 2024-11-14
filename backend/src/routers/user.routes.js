import { Router } from "express";
import { userControllers } from "../controllers/index.js";
import { authenticate } from "../middleware/authenticateMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const userRouter = Router();

// Get
userRouter.get("/profile", authenticate, userControllers.getProfile);

// Post

// Patch
userRouter.patch(
  "/changePassword",
  authenticate,
  userControllers.changePassword
);
userRouter.patch(
  "/forgotPassword",
  authenticate,
  userControllers.forgotPassword
);

userRouter.patch(
  "/",
  authenticate,
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  userControllers.updateProfile
);

export default userRouter;
