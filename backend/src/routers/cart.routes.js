import { Router } from "express";
import { cartControllers } from "../controllers/index.js";

const cartRouter = Router();
cartRouter.post("/add", cartControllers.addToCart);
cartRouter.get("/my-cart", cartControllers.getCartByUser);
cartRouter.post("/update-quantity", cartControllers.updateCartItemQuantity);
export default cartRouter;
