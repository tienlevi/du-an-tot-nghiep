import { Router } from "express";
import {
  getUserProfile,
  lockUserAccount,
  unLockUserAccount,
} from "../controllers/user";

const router = Router();
router.get("/user/profile", getUserProfile);
router.put("/user/profile/:id", lockUserAccount);
router.put("/user/profile/:id", unLockUserAccount);

export default router;
