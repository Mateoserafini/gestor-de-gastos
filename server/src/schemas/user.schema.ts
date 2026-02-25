import { z } from 'zod';

export const updateProfileSchema = z.object({
    username: z.string({
        message: "El nombre de usuario debe ser texto"
    }).min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres" }).optional(),
    email: z.string({
        message: "El email debe ser texto"
    }).email({ message: "Formato de email inválido" }).optional(),
});

export const updatePasswordSchema = z.object({
    currentPassword: z.string({
        message: "La contraseña actual es requerida"
    }).min(1, { message: "La contraseña actual es requerida" }),
    newPassword: z.string({
        message: "La nueva contraseña es requerida"
    }).min(6, { message: "La nueva contraseña debe tener al menos 6 caracteres" }),
});
