import Comunidad from "../models/comunnity.js";
import color from "chalk";

export const getCommunity = async (req, res) => {
    try {
        const community = await Comunidad.findAll();
        console.log(color.green(`Comunidades encontradas: ${community}`))
        return res.status(200).json({ community })
    }
    catch (error) {
        console.log(color.red(error))
    }
}

export const getCommunityID = async (req, res) => {
    const user = req.user;
    try {
        const community = await Comunidad.findAll({ where: { moderador_id: user.id } });
        if (community.length === 0) {
            console.log(color.red("No posee comunidades"))
            return res.status(404).json({ message: "No posee comunidades" });
        }
        console.log(color.green(`Comunidad encontrada: ${community}`))
        return res.status(200).json({ community })
    }
    catch (error) {
        console.log(color.red(error))
        res.status(500).json({ message: "Se produjo un error en el servidor" })
    }
}

export const createCommunity = async (req, res) => {
    const user = req.user
    const { nombre, desc } = req.body;
    try {
        if (user.role !== "institucion" && user.role !== "profesional") {
            console.log(color.red("No puede crear una comunidad"))
            return res.status(403).json({ message: "Solo las instituciones y profesionales pueden crear una comunidad" });
        }

        await Comunidad.create({
            nombre,
            desc,
            img_perfil: req.file ? req.file.path : null,
            moderador_id: user.id
        })
        console.log(color.blue(`Comunidad creada`))
        return res.status(201).json({ message: "Comunidad creada" })
    }
    catch (error) {
        console.log(color.red(error))
        res.status(500).json({ message: "Se produjo un error en el servidor" })
    }
}

export const updateCommunity = async (req, res) => {
    const user = req.user
    const { id } = req.params;
    const { nombre, desc } = req.body;
    try {
        const community = await Comunidad.findOne({ where: { id } });
        if (!community) {
            console.log(color.red("No se encontro la comunidad"))
            return res.status(404).json({ message: "No se encontro la comunidad" })
        }
        if (community.moderador_id !== user.id) {
            console.log(color.red("No puede modificar esta comunidad"))
            return res.status(403).json({ message: "Solo puedes modificar tus comunidades" })
        }
        await Comunidad.update({
            nombre,
            desc,
            img_perfil: req.file ? req.file.path : null,
            img_portada: req.file ? req.file.path : null
        }, { where: { id } })
        console.log(color.blue(`Comunidad actualizada`))
        return res.status(200).json({ message: "Comunidad actualizada" })
    }
    catch (error) {
        console.log(color.red(error))
        res.status(500).json({ message: "Se produjo un error en el servidor" })
    }
}

export const deleteCommunity = async (req, res) => {
    const user = req.user
    const { id } = req.params;
    try {
        const community = await Comunidad.findOne({ where: { id } });
        if (!community) {
            console.log(color.red("No se encontro la comunidad"))
            return res.status(404).json({ message: "No se encontro la comunidad" })
        }
        if (community.moderador_id !== user.id) {
            console.log(color.red("No puede eliminar esta comunidad"))
            return res.status(403).json({ message: "Solo puedes eliminar tus comunidades" })
        }
        await Comunidad.destroy({ where: { id } })
        console.log(color.blue(`Comunidad eliminada`))
        return res.status(200).json({ message: "Comunidad eliminada" })
    }
    catch (error) {
        console.log(color.red(error))
        res.status(500).json({ message: "Se produjo un error en el servidor" })
    }
}




