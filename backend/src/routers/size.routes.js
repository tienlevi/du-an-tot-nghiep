import { Router } from "express";
import { sizeControllers } from "../controllers/index.js";
const router = Router();

// @Get
router.get("/all", sizeControllers.getAllSizes);
router.get("/:id", sizeControllers.getDetailedSize);

// @Post
router.post("/", sizeControllers.createSize);

// @Patch
router.patch("/:id", sizeControllers.updateSize);

export default router;
