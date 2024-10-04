import { Usuario } from '../models/users.js';
import { Profesional } from '../models/profesional.js';
import { Institucion } from '../models/institucion.js';
import color from 'chalk'
import bcrypt from 'bcryptjs';


export const getUsers = async (req, res) => {
    const user = req.user;

    // Verificar que el usuario esté autenticado
    if (!user || !user.id) {
        console.log(user)
        return res.status(401).json({ message: "No autorizado" });
    }

    try {
        // Busca al usuario por su ID
        const usuario = await Usuario.findByPk(user.id);

        // Verifica si el usuario existe
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        // Devuelve los datos del usuario
        res.status(200).json(usuario);
    } catch (error) {
        console.log(color.red("-------------------------------------------------------------"));
        console.log(color.redBright(error));
        console.log(color.red("-------------------------------------------------------------"));
        return res.status(500).json({ error: "Se produjo un error en el sistema" });
    }
};

export const deleteUser = async (req, res) => {
    const user = req.user;
    try {
        //* Buscar el usuario por ID
        const usuario = await Usuario.findAll({ where: { id: user.id } });
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        //! Eliminar el usuario
        await Usuario.destroy({ where: { id: user.id } });
        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        console.log(color.red("-------------------------------------------------------------"));
        console.log(color.redBright(error));
        console.log(color.red("-------------------------------------------------------------"));
        return res.status(500).json({ error: "Se produjo un error en el sistema" });
    }
};

export const updateUser = async (req, res) => {

};
