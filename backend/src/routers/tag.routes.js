import { Router } from "express";
import { tagControllers } from "../controllers/index.js";
import { authenicate } from "../middleware/authenticateMiddleware.js";
import { authorsize } from "../middleware/authorizeMiddleware.js";
import { ROLE } from "../constants/role.js";

const TagRouter = Router();

// Get
TagRouter.get("/:id", tagControllers.getTag);

// Post
TagRouter.post(
  "/",
  authenicate,
  authorsize(ROLE.ADMIN),
  tagControllers.createTag
);

// Patch
TagRouter.patch(
  "/:id",
  authenicate,
  authorsize(ROLE.ADMIN),
  tagControllers.updateTag
);

export default TagRouter;
