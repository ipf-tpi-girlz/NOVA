import { Comentario } from "../models/comentario.js";
import { Publicacion } from "../models/publicacion.js";
import { Usuario } from '../models/users.js'
import { interaccion_publicacion } from '../models/interaccion-PCR.js'
import color from 'chalk'
export const getComment = async (req, res) => {
  try {

  } catch (error) {
    console.log(color.red("-------------------------------------------------------------"));
    console.log(color.redBright(error));
    console.log(color.red("-------------------------------------------------------------"));
    return res.status(500).json({ error: "Se produjo un error en el sistema" });
  }
};

export const createComment = async (req, res) => {
  const { id } = req.params; // ID de la publicación
  const user = req.user;
  const { content } = req.body;

  console.log(color.green("----------------------------"));
  console.log(color.green(id)); // ID de la publicación
  console.log(color.green("----------------------------"));
  console.log(color.blue("----------------------------"));
  console.log(color.blue(user.id)); // ID del usuario
  console.log(color.blue("----------------------------"));

  try {
    //! Validar existencia de usuario
    const userExist = await Usuario.findOne({ where: { id: user.id } });
    if (!userExist) {
      return res.status(404).json({ message: "Usuario no encontrado en nuestro sistema" });
    }

    //! Validar existencia de la publicación
    const publicacionExist = await Publicacion.findOne({ where: { id } });
    if (!publicacionExist) {
      return res.status(404).json({ message: "La publicación que desea comentar no existe" });
    }

    //* Crear comentario
    const comentario = await Comentario.create({
      content: content,
      publicacion_id: id,
      usuario_id: user.id
    });

    //* Crear interacción
    await interaccion_publicacion.create({
      publicacion_id: id,
      comentario_id: comentario.id,
      usuario_id: user.id,
      respuesta_id: null
    });

    res.status(200).json({ message: "Comentario e interacción creados exitosamente" });

  } catch (error) {
    console.log(color.red("-------------------------------------------------------------"));
    console.log(color.redBright(error));
    console.log(color.red("-------------------------------------------------------------"));
    return res.status(500).json({ error: "Se produjo un error en el sistema" });
  }
};


export const updateComment = async (req, res) => {
  const { id } = req.params
  const user = req.user
  const { content } = req.body
  try {
    //!validar existencia de usuario
    const userExist = await Usuario.findAll({ where: { id: user.id } });
    if (userExist.length === 0) return res.status(404).json({ message: "Usuario no encontrado en nuestro sistema" });
    //!validar existencia de comentario
    const comentarioExist = await Comentario.findAll({ where: { id } });
    if (comentarioExist.length === 0) return res.status(404).json({ message: "El comentario que desea editar no existe" })
    //!validar si el usuario es el dueño del comentario
    if (comentarioExist[0].usuarioId !== user.id) return res.status(401).json({ message: "solo el usuario que creo el comentario puede editarlo" })

    //*edicion de datos
    await Comentario.update({ content }, { where: { id } })

    return res.status(200).json({ message: "El comentario ha sido editado" })

  } catch (error) {
    console.log(color.red("-------------------------------------------------------------"));
    console.log(color.redBright(error));
    console.log(color.red("-------------------------------------------------------------"));
    return res.status(500).json({ error: "Se produjo un error en el sistema" });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params
  const user = req.user
  try {
    //!validar existencia de usuario
    const userExist = await Usuario.findAll({ where: { id: user.id } });
    if (userExist.length === 0) return res.status(404).json({ message: "Usuario no encontrado en nuestro sistema" });
    //!validar existencia de comentario
    const comentarioExist = await Comentario.findAll({ where: { id } });
    if (comentarioExist.length === 0) return res.status(404).json({ message: "El comentario que desea editar no existe" })
    //!validar si el usuario es el dueño del comentario
    if (comentarioExist[0].usuarioId !== user.id) return res.status(401).json({ message: "solo el usuario que creo el comentario puede eliminarlo" })

    //*eliminacion de datos
    await Comentario.destroy({ where: { id } })

    res.status(200).json({ message: "El comentario ha sido eliminado" })
  } catch (error) {
    console.log(color.red("-------------------------------------------------------------"));
    console.log(color.redBright(error));
    console.log(color.red("-------------------------------------------------------------"));
  }
};
