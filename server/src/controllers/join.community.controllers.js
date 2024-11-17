import ParticipanteComunidad from "../models/join.comunity.js"
import color from "chalk"
import Comunidad from "../models/comunnity.js"
import Usuario from "../models/users.js"
import { ValidationErrorItemOrigin } from "sequelize"


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

export const userCommunity = async (req, res) => {
    const user = req.user;
    try {
        const communities = await Comunidad.findAll({
            include: [
                {
                    model: ParticipanteComunidad,
                    as: 'participantes',
                    where: { usuario_id: 1 },
                    attributes: ['usuario_id', 'comunidad_id'],
                    include: [
                        {
                            model: Usuario,
                            as: 'usuario',
                            attributes: ['nombre']
                        }
                    ]
                }
            ]
        });

        if (communities.length === 0) {
            return res.status(200).json({
                message: "Aún no perteneces a ninguna comunidad"
            });
        }

        return res.status(200).json({
            communities
        });
    } catch (error) {
        console.log(color.red(error));
        return res.status(500).json({ message: "Se produjo un error en el servidor" });
    }
};


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

export const getCommunitiesForUser = async (req, res) => {
    const userId = req.user.id; // El ID del usuario autenticado lo tomamos de req.user

    try {
        // Primero, obtenemos las comunidades del usuario autenticado
        const comunidades = await ParticipanteComunidad.findAll({
            where: { usuario_id: userId },
            include: [{
                model: Comunidad,
                as: 'comunidad',
                attributes: ['id', 'nombre', 'desc', 'img_perfil', 'img_portada'],
            }]
        });

        // Si el usuario no pertenece a ninguna comunidad
        if (comunidades.length === 0) {
            return res.status(404).json({ message: "El usuario no pertenece a ninguna comunidad." });
        }

        // Obtenemos los datos del usuario autenticado
        const user = req.user; // Los datos del usuario se encuentran en req.user, gracias al middleware validarJWT

        // Formateamos las comunidades para retornar solo los datos relevantes
        const comunidadesData = comunidades.map(participante => participante.comunidad);

        // Retornamos tanto las comunidades como los datos del usuario en la respuesta
        return res.status(200).json({
            usuario: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                genero: user.genero,
                departamento: user.departamento,
                localidad: user.localidad,
                img_perfil: user.img_perfil,
                fecha_registro: user.fecha_registro
            },
            comunidades: comunidadesData
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Se produjo un error en el servidor." });
    }
};


