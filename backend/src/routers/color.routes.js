import { Router } from "express";
import { colorControllers } from "../controllers/index.js";
const router = Router();

// @Get
router.get("/all", colorControllers.getAllColors);

// @Post
router.post("/", colorControllers.createColor);

// @Patch
router.patch("/:id", colorControllers.updateColor);

export default router;
