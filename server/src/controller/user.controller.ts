import type { Request, Response } from 'express';
import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const { username, email } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        if (username && username !== user.username) {
            const existingUsername = await User.findOne({ username });
            if (existingUsername) {
                return res.status(400).json({ message: "El nombre de usuario ya está en uso" });
            }
            user.username = username;
        }

        if (email && email !== user.email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail) {
                return res.status(400).json({ message: "El email ya está registrado" });
            }
            user.email = email;
        }

        await user.save();

        res.json({
            message: "Perfil actualizado correctamente",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                updatedAt: user.updatedAt
            }
        });

    } catch (error) {
        console.error("Error al actualizar perfil:", error);
        res.status(500).json({ message: "Error interno al actualizar el perfil" });
    }
};

export const updatePassword = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(userId);
        if (!user || !user.password) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "La contraseña actual es incorrecta" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();

        res.json({ message: "Contraseña actualizada correctamente" });

    } catch (error) {
        console.error("Error al actualizar contraseña:", error);
        res.status(500).json({ message: "Error interno al actualizar la contraseña" });
    }
};
