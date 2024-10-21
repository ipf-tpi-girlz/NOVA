import color from "chalk";
import Publicacion from "../models/post.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Publicacion.findAll();
    console.log(posts);
    res.status(200).json({ posts });
  } catch (error) {
    console.log(color.red(error));
    res.status(500).json({ message: "Se produjo un error en el servidor" });
  }
};

export const getPostUser = async (req, res) => {
  const { user } = req;
  try {
    const post = await Publicacion.findOne({ where: { usuario_id: user.id } });
    if (!post) {
      console.log(color.red("No se encontro la publicacion"));
      return res.status(404).json({ message: "No se encontro la publicacion" });
    }
    console.log(color.green(`Publicacion encontrada: ${post}`));
    res.status(200).json({ post });
  } catch (error) {
    console.log(color.red(error));
    res.status(500).json({ message: "Se produjo un error en el servidor" });
  }
};

export const createPost = async (req, res) => {
  const { title, desc } = req.body;
  const { user } = req;
  console.log(title, desc);
  try {
    await Publicacion.create({
      nombre: title,
      desc,
      usuario_id: user.id,
    });
    res.status(201).json({
      message: "La publicacion se ha creado correctamente",
    });
    console.log(color.green("Publicacion creada correctamente"));
  } catch (error) {
    console.log(color.red(error));
    res.status(500).json({ message: "Se produjo un error en el servidor" });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { nombre, desc } = req.body;
  const { user } = req;
  try {
    const post = await Publicacion.findOne({ where: { id } });
    if (!post) {
      console.log(color.red("No se encontro la publicacion"));
      return res.status(404).json({ message: "No se encontro la publicacion" });
    }
    if (post.usuario_id !== user.id) {
      console.log(
        color.red("No tienes permiso para actualizar esta publicacion")
      );
      return res.status(403).json({
        message: "No tienes permiso para actualizar esta publicacion",
      });
    }
    await post.update({
      nombre,
      desc,
    });
    console.log(color.green("Publicacion actualizada correctamente"));
    res.status(200).json({
      message: "La publicacion se ha actualizado correctamente",
    });
  } catch (error) {
    console.log(color.red(error));
    res.status(500).json({ message: "Se produjo un error en el servidor" });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  try {
    const post = await Publicacion.findOne({ where: { id } });
    if (!post) {
      console.log(color.red("No se encontro la publicacion"));
      return res.status(404).json({ message: "No se encontro la publicacion" });
    }
    if (post.usuario_id !== user.id) {
      console.log(
        color.red("No tienes permiso para eliminar esta publicacion")
      );
      return res
        .status(403)
        .json({ message: "No tienes permiso para eliminar esta publicacion" });
    }
    await post.destroy();
    console.log(color.green("Publicacion eliminada correctamente"));
    res.status(200).json({
      message: "La publicacion se ha eliminado correctamente",
    });
  } catch (error) {
    console.log(color.red(error));
    res.status(500).json({ message: "Se produjo un error en el servidor" });
  }
};
