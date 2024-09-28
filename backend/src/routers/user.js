import { Router } from "express";
import {
  deleteUserProfile,
  getUserProfile,
  lockUserAccount,
  unLockUserAccount,
} from "../controllers/user";

const router = Router();
router.get("/user/profile", getUserProfile);
router.delete("/user/profile/:id", deleteUserProfile);
router.put("/user/profile/:id", lockUserAccount);
router.put("/user/profile/:id", unLockUserAccount);

export default router;
