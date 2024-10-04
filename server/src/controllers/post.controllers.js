import { Publicacion } from "../models/publicacion.js";
import { Subforo } from "../models/subForo.js";
import { Usuario } from "../models/users.js";
import color from "chalk";
export const getPost = async (req, res) => {
  try {
    const publicacion = await Publicacion.findAll({});
    if (publicacion.length === 0)
      return res
        .status(404)
        .json({ message: "No existen publicaciones actualmente" });
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
  console.log(color.green("----------------------------"))
  console.log(color.green(id))
  console.log(color.green("----------------------------"))
  console.log(color.blue("----------------------------"))
  console.log(color.blue(user.id))
  console.log(color.blue("----------------------------"))
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

    const newPublic = await Publicacion.create({
      title,
      img,
      content,
      subforo_id: id,  // Relacionado con el subforo
      usuario_id: user.id  // Relacionado con el usuario que la crea
    });
    newPublic
    res.status(200).json({ message: "Publicacion creada exitosamente", newPublic });
  } catch (error) {
    console.log(color.red("-------------------------------------------------------------"));
    console.log(color.redBright(error));
    console.log(color.red("-------------------------------------------------------------"));
    return res.status(500).json({ error: "Se produjo un error en el sistema" });
  }
};

export const updatePost = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { title, content } = req.body;
  const img = req.file ? req.file.path : null;
  try {
    //!validar existencia de usuario
    const userExist = await Usuario.findAll({ where: { id: user.id } });

    if (userExist.length === 0) return res.status(404).json({ message: "Usuario no encontrado en nuestro sistema" });
    //!validar existencia de publicacion
    const publicacionExist = await Publicacion.findAll({ where: { id } });

    if (publicacionExist.length === 0) return res.status(404).json({ message: "La publicacion que desea eliminar no existe" });
    //!validar si el usuario es el dueño de la publicacion
    if (publicacionExist[0].usuarioId !== user.id) return res.status(401).json({ message: "solo el usuario que creo la publicacion puede eliminarlo" });

    //*Actualizar datos
    await Publicacion.update({ title, img, content }, { where: { id } });

    res.status(200).json({ message: "Publicacion actualizada exitosamente" });

  } catch (error) {
    console.log(color.red("-------------------------------------------------------------"));
    console.log(color.redBright(error));
    console.log(color.red("-------------------------------------------------------------"));
    return res.status(500).json({ error: "Se produjo un error en el sistema" });
  }
};

export const deletePost = async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  try {
    //!validar existencia de usuario
    const userExist = await Usuario.findAll({ where: { id: user.id } });

    if (userExist.length === 0) return res.status(404).json({ message: "Usuario no encontrado en nuestro sistema" });
    //!validar existencia de publicacion
    const publicacionExist = await Publicacion.findAll({ where: { id } });

    if (publicacionExist.length === 0) return res.status(404).json({ message: "La publicacion que desea eliminar no existe" });
    //!validar si el usuario es el dueño de la publicacion
    if (publicacionExist[0].usuarioId !== user.id) return res.status(401).json({ message: "solo el usuario que creo la publicacion puede eliminarlo" });

    await Publicacion.destroy({ where: { id } });
    res.status(200).json({ message: "Publicacion eliminada exitosamente" });
  } catch (error) {
    console.log(color.red("-------------------------------------------------------------"));
    console.log(color.redBright(error));
    console.log(color.red("-------------------------------------------------------------"));
    return res.status(500).json({ error: "Se produjo un error en el sistema" });
  }

}
