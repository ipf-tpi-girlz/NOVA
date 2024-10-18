import Usuario from "../models/users";
import Perfil from "../models/profile";

export const getUsers = async (req, res) => {
    try {
        const users = await Usuario.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los usuarios" });
    }
};

export const getUserById = async (req, res) => {
    const user = req.user;
    if (user.role === "profesional" || user.role === "institucion") {
        const perfil = await Perfil.findOne({ where: { usuario_id: user.id } });
        if (!perfil) {
            return res.status(404).json({ message: "Perfil no encontrado" });
        }
        const userWithProfile = { ...user.toJSON(), perfil: perfil.toJSON() };
        return res.status(200).json(userWithProfile);
    }
    res.status(200).json(user);
};