import { Router } from "express";
import { addFavorite, removeFavorite, getFavorites } from "../controllers/favorite";

const router = Router();


router.post("/favorites", addFavorite);
router.delete("/favorites/:id", removeFavorite);
router.get("/favorites/:userId", getFavorites);

export default router;
