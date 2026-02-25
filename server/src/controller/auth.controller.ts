import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: "El email ya está registrado" });
            }
            if (existingUser.username === username) {
                return res.status(400).json({ message: "El nombre de usuario ya está en uso" });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).json({
            message: "Usuario registrado exitosamente",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            }
        });

    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ message: "Error interno del servidor al registrar el usuario" });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || typeof user.password !== "string") {
            return res.status(400).json({ message: "Credenciales incorrectas" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Credenciales incorrectas" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Inicio de sesión exitoso",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });

    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        res.status(500).json({ message: "Error interno del servidor al iniciar sesión" });
    }
};
