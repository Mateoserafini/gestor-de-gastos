import { Router } from 'express';
import { updateProfile, updatePassword } from '../controller/user.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { validateSchema } from '../middlewares/validate.middleware.js';
import { updateProfileSchema, updatePasswordSchema } from '../schemas/user.schema.js';

const router = Router();

router.put('/profile', authenticateToken, validateSchema(updateProfileSchema), updateProfile);
router.put('/password', authenticateToken, validateSchema(updatePasswordSchema), updatePassword);

export default router;
