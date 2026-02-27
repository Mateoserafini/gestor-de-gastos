import type { Request, Response } from "express";
import { Expense } from "../models/expense.model.js";

export const createExpense = async (req: Request, res: Response) => {
    try {
        const { amount, description, category, date } = req.body;
        const userId = req.user.id;
        const newExpense = new Expense({
            userId,
            amount,
            description,
            category,
            date
        });
        await newExpense.save();
        res.status(201).json({
            message: "Gasto creado exitosamente",
            expense: newExpense
        });
    } catch (error) {
        console.error("Error al crear gasto:", error);
        res.status(500).json({ message: "Error interno al crear el gasto" });
    }
};

export const getExpenses = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;

        const { category, startDate, endDate } = req.query;

        const query: any = { userId };

        if (category) {
            query.category = category;
        }

        if (startDate || endDate) {
            query.date = {};
            if (startDate) {
                query.date.$gte = new Date(startDate as string);
            }
            if (endDate) {
                query.date.$lte = new Date(endDate as string);
            }
        }

        const expenses = await Expense.find(query).sort({ date: -1 });

        res.json(expenses);
    } catch (error) {
        console.error("Error al obtener gastos:", error);
        res.status(500).json({ message: "Error interno al obtener los gastos" });
    }
};

export const getExpenseById = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const _id = req.params.id;
        const expense = await Expense.findOne({ _id: _id as any, userId });
        if (!expense) {
            return res.status(404).json({ message: "Gasto no encontrado" });
        }
        res.json(expense);
    } catch (error) {
        console.error("Error al obtener gasto por ID:", error);
        res.status(500).json({ message: "Error interno al obtener el gasto" });
    }
};

export const updateExpense = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const _id = req.params.id;
        const { amount, description, category, date } = req.body;
        const expense = await Expense.findOneAndUpdate(
            { _id: _id as any, userId },
            { amount, description, category, date },
            { new: true }
        );
        if (!expense) {
            return res.status(404).json({ message: "Gasto no encontrado" });
        }
        res.json({
            message: "Gasto actualizado exitosamente",
            expense
        });
    } catch (error) {
        console.error("Error al actualizar gasto:", error);
        res.status(500).json({ message: "Error interno al actualizar el gasto" });
    }
};

export const deleteExpense = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const _id = req.params.id;
        const expense = await Expense.findOneAndDelete({ _id: _id as any, userId });
        if (!expense) {
            return res.status(404).json({ message: "Gasto no encontrado" });
        }
        res.json({ message: "Gasto eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar gasto:", error);
        res.status(500).json({ message: "Error interno al eliminar el gasto" });
    }
};