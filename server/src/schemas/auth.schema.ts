import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string({
        message: 'El nombre de usuario es obligatorio y debe ser texto'
    }).min(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' }),
    email: z.string({
        message: 'El email es obligatorio'
    }).email({ message: 'Formato de email inválido' }),
    password: z.string({
        message: 'La contraseña es obligatoria'
    }).min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
});

export const loginSchema = z.object({
    email: z.string({
        message: 'El email es obligatorio'
    }).email({ message: 'El correo electrónico no es válido' }),
    password: z.string({
        message: 'La contraseña es obligatoria'
    }).min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
});