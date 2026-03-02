import type { Request, Response } from "express";
import { Income } from "../models/income.model.js";

export const getIncomes = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.json(incomes);
    } catch (error) {
        console.error("Error al obtener ingresos:", error);
        res.status(500).json({ message: "Error interno al obtener los ingresos" });
    }
};

export const createIncome = async (req: Request, res: Response) => {
    try {
        const { amount, description, category, date } = req.body;
        const userId = req.user.id;

        const newIncome = new Income({
            userId,
            amount,
            description,
            category,
            date
        });

        await newIncome.save();

        res.status(201).json({
            message: "Ingreso creado exitosamente",
            income: newIncome
        });
    } catch (error) {
        console.error("Error al crear ingreso:", error);
        res.status(500).json({ message: "Error interno al crear el ingreso" });
    }
};

export const getIncomeById = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const incomeId = req.params.id;

        const income = await Income.findOne({ _id: incomeId as any, userId });

        if (!income) {
            return res.status(404).json({ message: "Ingreso no encontrado" });
        }

        res.json(income);
    } catch (error) {
        console.error("Error al obtener ingreso:", error);
        res.status(500).json({ message: "Error interno al obtener el ingreso" });
    }
};

export const updateIncome = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const incomeId = req.params.id;
        const updateData = req.body;

        const income = await Income.findOneAndUpdate(
            { _id: incomeId as any, userId },
            updateData,
            { new: true, runValidators: true }
        );

        if (!income) {
            return res.status(404).json({ message: "Ingreso no encontrado" });
        }

        res.json({
            message: "Ingreso actualizado exitosamente",
            income
        });
    } catch (error) {
        console.error("Error al actualizar ingreso:", error);
        res.status(500).json({ message: "Error interno al actualizar el ingreso" });
    }
};

export const deleteIncome = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const incomeId = req.params.id;

        const income = await Income.findOneAndDelete({ _id: incomeId as any, userId });

        if (!income) {
            return res.status(404).json({ message: "Ingreso no encontrado" });
        }

        res.json({ message: "Ingreso eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar ingreso:", error);
        res.status(500).json({ message: "Error interno al eliminar el ingreso" });
    }
};
