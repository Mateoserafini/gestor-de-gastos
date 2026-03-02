import { z } from 'zod';

export const createIncomeSchema = z.object({
    amount: z.number({
        message: 'El monto es obligatorio y debe ser un número'
    }).positive({ message: 'El monto debe ser un número positivo' }),
    description: z.string({
        message: 'La descripción es obligatoria y debe ser texto'
    }).min(1, { message: 'La descripción no puede estar vacía' }),
    category: z.string({
        message: 'La categoría debe ser texto'
    }).optional(),
    date: z.string({
        message: 'La fecha es obligatoria y debe ser una cadena de texto en formato ISO'
    }).refine((date) => !isNaN(Date.parse(date)), {
        message: 'La fecha debe ser una cadena de texto en formato ISO válida'
    }),
});

export const updateIncomeSchema = z.object({
    amount: z.number({
        message: 'El monto debe ser un número'
    }).positive({ message: 'El monto debe ser un número positivo' }).optional(),
    description: z.string({
        message: 'La descripción debe ser texto'
    }).min(1, { message: 'La descripción no puede estar vacía' }).optional(),
    category: z.string({
        message: 'La categoría debe ser texto'
    }).optional(),
    date: z.string({
        message: 'La fecha debe ser una cadena de texto en formato ISO'
    }).refine((date) => !isNaN(Date.parse(date)), {
        message: 'La fecha debe ser una cadena de texto en formato ISO válida'
    }).optional(),
});
