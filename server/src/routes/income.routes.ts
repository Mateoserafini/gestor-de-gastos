import { Router } from "express";
import {
    getIncomes,
    createIncome,
    getIncomeById,
    updateIncome,
    deleteIncome
} from "../controller/income.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { createIncomeSchema, updateIncomeSchema } from "../schemas/income.schema.js";

const router = Router();

// Aplicar middleware de autenticación a todas las rutas de ingresos
router.use(authenticateToken);

router.get('/', getIncomes);
router.post('/', validateSchema(createIncomeSchema), createIncome);
router.get('/:id', getIncomeById);
router.put('/:id', validateSchema(updateIncomeSchema), updateIncome);
router.delete('/:id', deleteIncome);

export default router;
