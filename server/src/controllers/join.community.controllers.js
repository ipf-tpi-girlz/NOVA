import ParticipanteComunidad from "../models/join.comunity.js"
import color from "chalk"
import Comunidad from "../models/comunnity.js"
import Usuario from "../models/users.js"

export const getUsersJoin = async (req, res) => {
    const { id } = req.params;
    try {
        const users = await ParticipanteComunidad.findAll({
            where: { comunidad_id: id },
            include: [{
                model: Usuario,
                as: 'usuario'
            }]
        });
        console.log(color.green(users));
        return res.status(200).json(users);
    } catch (error) {
        console.log(color.red(error));
        return res.status(500).json({ message: "Se produjo un error en el servidor" });
    }
}

export const joinCommunity = async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    try {
        const comunidad = await Comunidad.findOne({ where: { id } });
        //validaciones
        if (!comunidad) {
            return res.status(404).json({ message: "La comunidad a la que se desea unir no se encuentra en nuestros registros" });
        }
        const existUser = await ParticipanteComunidad.findOne({ where: { comunidad_id: id, usuario_id: user.id } });
        if (existUser) {
            console.log(color.red("Ya perteneces a esta comunidad"));
            return res.status(400).json({ message: "Ya perteneces a esta comunidad" });
        }
        //añadir a la comunidad
        const newParticipante = await ParticipanteComunidad.create({ comunidad_id: id, usuario_id: user.id });
        console.log(color.green("Participante creado"));
        return res.status(201).json(newParticipante);
    } catch (error) {
        console.log(color.red(error));
        return res.status(500).json({ message: "Se produjo un error en el servidor" });
    }
}

export const deleteJoin = async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    try {
        const comunidad = await Comunidad.findOne({ where: { id } });
        //validaciones
        if (!comunidad) {
            return res.status(404).json({ message: "La comunidad que desea eliminar no existe en nuestros registros" })
        }
        //eliminar de la comunidad
        await ParticipanteComunidad.destroy({ where: { comunidad_id: id, usuario_id: user.id } });
        console.log(color.green("Participante eliminado"));
        return res.status(200).json({ message: "Se ha eliminado tu participacion de esta comunidad" });
    } catch (error) {
        console.log(color.red(error));
        return res.status(500).json({ message: "Se produjo un error en el servidor" });
    }
}
