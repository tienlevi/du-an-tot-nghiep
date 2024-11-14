import { Router } from "express";
import { userControllers } from "../controllers/index.js";
import { authenicate } from "../middleware/authenticateMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const userRouter = Router();

// Get
userRouter.get("/profile", authenicate, userControllers.getProfile);

// Post

// Patch
userRouter.patch(
  "/changePassword",
  authenicate,
  userControllers.changePassword
);
userRouter.patch(
  "/forgotPassword",
  authenicate,
  userControllers.forgotPassword
);

userRouter.patch(
  "/",
  authenicate,
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  userControllers.updateProfile
);

export default userRouter;
