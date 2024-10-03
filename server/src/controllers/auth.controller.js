import { Usuario } from '../models/users.js';
import { Profesional } from '../models/profesional.js';
import { Institucion } from '../models/institucion.js';
import bcrypt from 'bcryptjs';


export const getUsers = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        if (usuarios.length === 0) return res.status(404).json({ message: "No se encontraron usuarios" });
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Se produjo un error en el servidor" });
    }
}
export const deleteUser = async (req, res) => {
    const user = req.user;
    const id = user.id
    try {
        //* Buscar el usuario por ID
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        //! Eliminar el usuario
        await usuario.destroy();
        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Se produjo un error en el servidor" });
    }
};

export const updateUser = async (req, res) => {

};
