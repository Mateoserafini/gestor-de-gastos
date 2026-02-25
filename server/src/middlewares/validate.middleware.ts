import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import type { ZodSchema } from 'zod';

export const validateSchema = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    message: "Error de validación",
                    errors: error.issues.map((err) => err.message)
                });
            }
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    };
};
