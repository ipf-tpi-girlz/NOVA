import { PostComunity } from "../models/post.community.js";
import Comunidad from "../models/comunnity.js";
import color from "chalk";

export const getPostsComunity = async (req, res) => {
    //*id de la comunidad
    const { id } = req.params;
    try {
        const posts = await PostComunity.findAll({ where: { comunidad_id: id } });
        if (posts.length === 0) {
            console.log(color.red("No se encontraron posts en esta comunidad"))
            return res.status(404).json({ message: "No se encontraron posts en esta comunidad" });
        }
        console.log(color.green("Publicaciones encontrados"))
        return res.status(200).json(posts);
    } catch (error) {
        console.log(color.red(error))
        return res.status(500).json({ message: "Se produjo un error en el servidor" });
    }
}

export const createPostComunity = async (req, res) => {
    const { id } = req.params;
    const { titulo, contenido } = req.body;
    const user = req.user;
    try {
        const comunidad = await Comunidad.findOne({ where: { id } });
        if (!comunidad) {
            return res.status(404).json({ message: "La comunidad no se encuentra en nuestros registros" });
        }
        const post = await PostComunity.create({
            comunidad_id: id,
            usuario_id: user.id,
            titulo,
            contenido,
            img: req.file ? req.file.path : null
        });
        return res.status(201).json(post);
    } catch (error) {
        console.log(color.red(error))
        return res.status(500).json({ message: "Se produjo un error en el servidor" });
    }
}

export const updatePostComunity = async (req, res) => {
    const { id } = req.params;
    const { titulo, contenido } = req.body;
    const user = req.user;
    try {
        const post = await PostComunity.findOne({ where: { id } });
        if (!post) {
            return res.status(404).json({ message: "La publicación no se encuentra en nuestros registros" });
        }
        if (post.usuario_id !== user.id) {
            console.log(color.red("No es dueño de la publicación"))
            return res.status(403).json({ message: "Solo el dueño de la publicación puede modificarla" });
        }
        await post.update({ titulo, contenido, img: req.file ? req.file.path : null });
        return res.status(200).json(post);
    } catch (error) {
        console.log(color.red(error))
        return res.status(500).json({ message: "Se produjo un error en el servidor" });
    }
}

export const deletePostComunity = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    try {
        const post = await PostComunity.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: "La publicación no se encuentra en nuestros registros" });
        }
        if (post.usuario_id !== user.id) {
            console.log(color.red("No es dueño de la publicación"))
            return res.status(403).json({ message: "Solo el dueño de la publicación puede eliminarla" });
        }
        await post.destroy();
        console.log(color.green("Publicación eliminada correctamente"))
        return res.status(200).json({ message: "Publicación eliminada correctamente" });
    } catch (error) {
        console.log(color.red(error))
        return res.status(500).json({ message: "Se produjo un error en el servidor" });
    }
}

