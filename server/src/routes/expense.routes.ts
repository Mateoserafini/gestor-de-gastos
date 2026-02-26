import { Router } from "express";
import { createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense } from "../controller/expense.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { createExpenseSchema, updateExpenseSchema } from "../schemas/expense.schema.js";

const router = Router();

router.post('/', authenticateToken, validateSchema(createExpenseSchema), createExpense);
router.get('/', authenticateToken, getExpenses);
router.get('/:id', authenticateToken, getExpenseById);
router.put('/:id', authenticateToken, validateSchema(updateExpenseSchema), updateExpense);
router.delete('/:id', authenticateToken, deleteExpense);

export default router;