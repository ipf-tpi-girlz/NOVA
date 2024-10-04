import { Usuario } from "../models/users.js";
import { Subforo } from "../models/subForo.js";
import { Foro } from "../models/foro.js";
import color from "chalk";

export const getSubforos = async (req, res) => {
  try {
    // Obtener todos los subforos con sus publicaciones, comentarios y respuestas
    const subforos = await Subforo.findAll({});
    if (subforos.length === 0) return res.status(404).json({ message: "No existen subforos en el sistema" });
    // Enviar la información de subforos, publicaciones, comentarios y respuestas
    res.status(200).json({ subforos });
  } catch (error) {
    console.log(
      "----------------------------------------------------------------------------"
    );
    console.error(error);
    console.log(
      "----------------------------------------------------------------------------"
    );
    res
      .status(500)
      .json({ error: "Error al obtener la información de subforos" });
  }
};

export const createSubForo = async (req, res) => {
  const { id } = req.params
  const user = req.user;
  const { title, desc } = req.body;
  const id_user = user.id;
  console.log(
    color.bgBlue(
      "-----------------------------------------------------------------------------"
    )
  );
  console.log(color.bgBlue(id));
  console.log(
    color.bgBlue(
      "-----------------------------------------------------------------------------"
    )
  );
  try {
    const exist = await Usuario.findAll({ where: { id: id_user } });

    if (exist.length === 0) return res.status(404).json({ message: "Usuario no encontrado en nuestro sistema" });


    //! Verificar si el usuario es una institución o un profesional (debe tener al menos uno de estos roles)
    if (user.role !== "institucion" && user.role !== "profesional") return res.status(400).json({
      message:
        "Solo instituciones o profesionales pueden crear nuevas secciones",
    });

    //!validar si existe el titulo
    const existSubF = await Subforo.findAll({ where: { title } });
    if (existSubF.length > 0) return res.status(400).json({
      message: "El titulo que desea ingresar ya existe en nuestro sistema",
    });

    //!validar si existe foro
    const existForo = await Foro.findAll({ where: { id: id } });
    if (existForo.length === 0) return res.status(404).json({ message: "Foro no encontrado en nuestro sistema" });

    //* Crear el subforo
    await Subforo.create({
      title,
      desc,
      moderador_id: id_user,
      foro_id: id
    });

    res.status(200).json({ message: "Seccion creada exitosamente" });
  } catch (error) {
    console.log(color.red("-------------------------------------------------------------"));
    console.log(color.redBright(error));
    console.log(color.red("-------------------------------------------------------------"));
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const updateSubForo = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const id_user = user.id;
  const { desc, title } = req.body
  try {
    //!validar existencia de usuario
    const userExist = await Usuario.findOne({ where: { id: id_user } });
    if (!userExist) return res.status(404).json({ message: "Usuario no encontrado en nuestro sistema" });
    //!validar existencia de subforo
    const subforoExist = await Subforo.findOne({ where: { id } });
    if (!subforoExist) return res.status(404).json({ message: "Seccion no encontrada" });
    //!validar si el usuario es moderador
    const moderador = subforoExist.moderador_id;
    if (id_user !== moderador) return res.status(400).json({ message: "Solo el moderador puede realizar esta operación" });
    if (subforoExist.title === title) return res.status(400).json({ message: "El titulo no puede ser el mismo" });
    //*actualizar datos
    await Subforo.update({ title, desc }, { where: { id } });
    res.status(200).json({ message: "Seccion actualizada exitosamente" });

  } catch (error) {
    console.log(color.red("------------------------------------------------------------"));
    console.error(color.red(error));
    console.log(color.red("-----------------------------------------------------------"))
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const deleteSubForo = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const id_user = user.id;
  try {
    //!validar existencia de usuario
    const userExist = await Usuario.findOne({ where: { id: id_user } });
    if (!userExist) return res.status(404).json({ message: "Usuario no encontrado en nuestro sistema" });
    //!validar existencia de subforo
    const subforoExist = await Subforo.findOne({ where: { id } });
    if (!subforoExist) return res.status(404).json({ message: "Seccion no encontrada" });
    //!validar si el usuario es moderador
    const moderador = subforoExist.moderador_id;
    if (id_user !== moderador) return res.status(400).json({ message: "Solo el moderador puede realizar esta operación" });
    //*Eliminar subforo
    await Subforo.destroy({ where: { id } });
    res.status(200).json({ message: "Seccion eliminada exitosamente" });
  } catch (error) {
    console.log(color.red("------------------------------------------------------------"));
    console.error(color.red(error));
    console.log(color.red("-----------------------------------------------------------"))
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
