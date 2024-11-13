import PublicacionImagen from "../models/postImg.js"
import color from "chalk"
import Usuario from "../models/users.js";

export const getArticles = async (req, res) => {
    try {
        const data = await PublicacionImagen.findAll({
            include: [{
                model: Usuario,
                as: 'usuario'
            }]
        });
        if (data[0] === undefined) {
            return res.status(404).json({ error: "No se encontraron datos" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al obtener los datos" });
    }
}

export const getArticleId = async (req, res) => {
    const { id } = req.params
    try {
        const data = await PublicacionImagen.findAll({
            where: { id },
            include: [{
                model: Usuario,
                as: 'usuario'
            }]
        });
        if (data[0] === undefined) {
            return res.status(404).json({ error: "No se encontraron datos" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al obtener los datos" });
    }
}

export const createArticle = async (req, res) => {
    const user = req.user
    const { nombre, desc } = req.body;
    try {
        const data = await PublicacionImagen.create({
            nombre,
            desc,
            img: req.file ? req.file.path : null,
            usuario_id: user.id
        })
        if (!data) {
            return res.status(400).json({ error: "No se pudo crear el articulo" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al crear el registro" });
    }
}

export const editArticle = async (req, res) => {
    const { id } = req.params
    const user = req.user
    const { nombre, desc } = req.body;
    try {
        const exist = await PublicacionImagen.findOne({
            where: { id }
        })
        if (!exist) {
            return res.status(404).json({ error: "El articulo no existe" });
        }

        if (exist.usuario_id !== user.id) {
            return res.status(403).json({ error: "No tienes permisos para editar este articulo" });
        }

        exist.update({
            nombre,
            desc
        })

        if (req.file) {
            exist.update({
                img: req.file ? req.file.path : null
            })
        }
        res.status(200).json({ message: "Articulo actualizado" });

    } catch (error) {
        console.log(color.red(error));
        res.status(500).json({ error: "Error al crear el registro" });
    }
}

export const deleteArticle = async (req, res) => {
    const { id } = req.params
    const user = req.user
    try {
        const exist = await PublicacionImagen.findOne({
            where: { id }
        })
        if (!exist) {
            return res.status(404).json({ error: "El articulo no existe" });
        }
        if (exist.usuario_id !== user.id) {
            return res.status(403).json({ error: "No tienes permisos para eliminar este articulo" });
        }
        await exist.destroy()
        res.status(200).json({ message: "Articulo eliminado" });
    } catch (error) {
        console.log(color.red(error));
        res.status(500).json({ error: "Error al crear el registro" });
    }
}