import { z } from 'zod';

export const createCategorySchema = z.object({
    name: z.string({
        message: 'El nombre de la categoría es obligatorio y debe ser texto'
    }).min(1, { message: 'El nombre de la categoría no puede estar vacío' }).max(30, { message: 'El nombre de la categoría no puede tener más de 30 caracteres' })
});
