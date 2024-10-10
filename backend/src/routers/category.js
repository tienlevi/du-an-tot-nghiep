import { Router } from "express";

import {
    create,
    deleteCategoryById,
    getAll,
    getCategoryById,
    updateCategoryById,
    getProductsByCategory
} from "../controllers/category";

const router = Router();
router.get("/categories", getAll);
router.get("/categories/:id", getCategoryById);
router.delete("/categories/:id", deleteCategoryById);
router.put("/categories/:id", updateCategoryById);
router.post("/categories", create);
router.get("/categories/:id/products", getProductsByCategory);
export default router;
