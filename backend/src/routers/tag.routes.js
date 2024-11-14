import { Router } from "express";
import { tagControllers } from "../controllers/index.js";
import { authenticate } from "../middleware/authenticateMiddleware.js";
import { authorsize } from "../middleware/authorizeMiddleware.js";
import { ROLE } from "../constants/role.js";

const TagRouter = Router();

// Get
TagRouter.get("/:id", tagControllers.getTag);

// Post
TagRouter.post(
  "/",
  authenticate,
  authorsize(ROLE.ADMIN),
  tagControllers.createTag
);

// Patch
TagRouter.patch(
  "/:id",
  authenticate,
  authorsize(ROLE.ADMIN),
  tagControllers.updateTag
);

export default TagRouter;
