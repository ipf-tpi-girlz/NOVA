import { Publicacion } from "../models/publicacion.js";
import { Subforo } from "../models/subForo.js";
import { Usuario } from "../models/users.js";

export const getPost = async (req, res) => {
  try {
    const publicacion = await Publicacion.findAll({});
    if (publicacion.length === 0)
      return res
        .status(404)
        .json({ message: "No existen publicaciones actualmente" });
    // Enviar la información de subforos, publicaciones, comentarios y respuestas
    res.status(200).json({ publicacion });
  } catch (error) {
    console.log(
      color.red("------------------------------------------------------------")
    );
    console.error(color.red(error));
    console.log(
      color.red("-----------------------------------------------------------")
    );
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const getPostId = async (req, res) => {
  const user = req.user;
  try {
    const userExist = await Usuario.findAll({ where: { id: user.id } });
    if (userExist.length > 0)
      return res
        .status(404)
        .json({ message: "Usuario no encontrado en nuestro sistema" });

    const postUser = await Publicacion.findAll({ usuarioId: user.id });
    if (postUser.length > 0)
      return res
        .status(404)
        .json({ message: "Este usuario no ha publicado nada aun" });

    res.status(200).json({ postUser });
  } catch (error) {
    console.log(
      color.red("------------------------------------------------------------")
    );
    console.error(color.red(error));
    console.log(
      color.red("-----------------------------------------------------------")
    );
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const createPost = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { title, content } = req.body;
  const img = req.file ? req.file.path : null;
  try {
    const existUser = await Usuario.findAll({ where: { id: user.id } });
    if (existUser.length === 0)
      return res
        .status(404)
        .json({ message: "Usuario no encontrado en nuestro sistema" });
    const existSubForo = await Subforo.findAll({ where: { id } });
    if (existSubForo.length === 0)
      return res.status(404).json({ message: "Seccion no encontrada" });
    const existPost = await Publicacion.findAll({ where: { title: title } });
    if (existPost.length > 0)
      return res
        .status(400)
        .json({ message: "El titulo que desea ingresar ya existe" });

    await Publicacion.create({
      title,
      img,
      content,
      subforo_id: id,
      usuario_id: user.id,
    });
    res.status(200).json({ message: "Publicacion creada exitosamente" });
  } catch (error) {
    console.log(
      color.red("------------------------------------------------------------")
    );
    console.error(color.red(error));
    console.log(
      color.red("-----------------------------------------------------------")
    );
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const updatePost = (req, res) => {};

export const deletePost = (req, res) => {
  res.send();
};
