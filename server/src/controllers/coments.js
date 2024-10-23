import Comentario from "../models/coments.js";
import color from "chalk";
import PublicacionComunidad from "../models/post.community.js"

export const getComments = async (req, res) => {
    const { id } = req.params;
    try {
        const existPublication = await PublicacionComunidad.findOne({ where: { id } })
        if (!existPublication) {
            console.log(color.red("Publicacion no encontrada"))
            return res.status(404).json({ message: "Publicacion no encontrada" })
        }
        const commentsTrue = await Comentario.findAll({
            where: {
                publicacion_id: id
            }
        })

        if (commentsTrue.length === 0) {
            console.log(color.red("no hay comentarios"))
            return res.status(404).json({ message: "Aun no han comentado en esta publicacion" })
        }
        console.log(color.green(commentsTrue))
        return res.status(200).json({ commentsTrue })
    } catch (error) {
        console.log(color.red(error))
        return res.status(500).json({ message: "Error al obtener los comentarios" })
    }
}

export const createComment = async (req, res) => {
    const { id } = req.params
    const user = req.user
    const { content } = req.body
    try {
        const existPublication = await PublicacionComunidad.findOne({ where: { id } })
        if (!existPublication) {
            return res.status(404).json({ message: "Publicacion no encontrada" })
        }
        const newComment = await Comentario.create({
            publicacion_id: id,
            usuario_id: user.id,
            contenido: content
        })
        return res.status(200).json({
            message: "Comentario creado exitosamente",
            comentario: newComment
        })
    } catch (error) {
        console.log(color.red(error))
        return res.status(500).json({ message: "Error al crear el comentario" })
    }
}

export const updateComment = async (req, res) => {
    const { id } = req.params
    const user = req.user
    const { content } = req.body
    try {
        const existComment = await Comentario.findOne({ where: { id } })
        if (!existComment) {
            return res.status(404).json({ message: "Comentario no encontrado" })
        }
        if (existComment.usuario_id !== user.id) {
            return res.status(401).json({ message: "Solo puedes actualizar tus comentarios" })
        }
        const updateComment = await Comentario.update({ contenido: content }, { where: { id } })
        return res.status(200).json({ message: "Comentario ha sido actualizado", comentario: updateComment })
    } catch (error) {
        console.log(color.red(error))
        return res.status(500).json({ message: "Error al actualizar el comentario" })
    }
}

export const deleteComment = async (req, res) => {
    const { id } = req.params
    const user = req.user
    try {
        const existComment = await Comentario.findOne({ where: { id } })
        if (!existComment) {
            console.log(color.red("Comentario no encontrado"))
            return res.status(404).json({ message: "Comentario no encontrado" })
        }
        if (existComment.usuario_id !== user.id) {
            console.log(color.red("no es dueño del comentario"))
            return res.status(401).json({ message: "Solo puedes eliminar tus comentarios" })
        }
        await Comentario.destroy({ where: { id } })
        return res.status(200).json({ message: "Comentario eliminado exitosamente" })
    } catch (error) {
        console.log(color.red(error))
        return res.status(500).json({ message: "Error al eliminar el comentario" })
    }
}
