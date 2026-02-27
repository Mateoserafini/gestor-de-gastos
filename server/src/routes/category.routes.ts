import { Router } from "express";
import { getCategories, createCategory, deleteCategory } from "../controller/category.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { createCategorySchema } from "../schemas/category.schema.js";

const router = Router();

router.get('/', authenticateToken, getCategories);
router.post('/', authenticateToken, validateSchema(createCategorySchema), createCategory);
router.delete('/:id', authenticateToken, deleteCategory);

export default router;
