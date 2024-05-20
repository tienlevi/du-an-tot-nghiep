import { Router } from "express";
import { createUpload } from "../controllers/upload";
import { upload } from "../middleware/upload";

const router = Router();
router.post(`/upload`, upload.single("image"), createUpload)
export default router;