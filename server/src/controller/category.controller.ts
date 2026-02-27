import type { Request, Response } from "express";
import { Category } from "../models/category.model.js";

// Categorías fijas por defecto para todos los usuarios
const DEFAULT_CATEGORIES = [
    "Alquiler",
    "Impuestos",
    "Comida",
    "Transporte",
    "Ocio",
    "Salud",
    "Educación",
    "Ropa",
    "Servicios",
    "Suscripciones",
    "Hogar",
    "Inversiones",
    "Ahorros",
    "Mascotas",
    "Otros"
];

export const getCategories = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        // Obtener las categorías personalizadas del usuario
        const customCategories = await Category.find({ userId }).sort({ createdAt: -1 });

        // Formatear la respuesta para enviar tanto las predeterminadas como las personalizadas
        res.json({
            defaults: DEFAULT_CATEGORIES,
            customs: customCategories,
            // Lista combinada de puros nombres para facilitar renders en el frontend
            allNames: [...DEFAULT_CATEGORIES, ...customCategories.map(c => c.name)]
        });
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        res.status(500).json({ message: "Error interno al obtener las categorías" });
    }
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const userId = req.user.id;

        // Verificar si es una categoría por defecto
        if (DEFAULT_CATEGORIES.map(c => c.toLowerCase()).includes(name.toLowerCase())) {
            return res.status(400).json({ message: "Esta categoría ya existe por defecto" });
        }

        // Verificar si el usuario ya creó una categoría con ese nombre
        const existingCategory = await Category.findOne({
            userId,
            name: { $regex: new RegExp(`^${name}$`, 'i') }
        });

        if (existingCategory) {
            return res.status(400).json({ message: "Ya has creado una categoría con este nombre" });
        }

        const newCategory = new Category({
            userId,
            name
        });

        await newCategory.save();

        res.status(201).json({
            message: "Categoría creada exitosamente",
            category: newCategory
        });
    } catch (error) {
        console.error("Error al crear categoría:", error);
        res.status(500).json({ message: "Error interno al crear la categoría" });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const categoryId = req.params.id;

        const category = await Category.findOneAndDelete({ _id: categoryId as any, userId });

        if (!category) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        res.json({ message: "Categoría eliminada exitosamente" });
    } catch (error) {
        console.error("Error al eliminar categoría:", error);
        res.status(500).json({ message: "Error interno al eliminar la categoría" });
    }
};
