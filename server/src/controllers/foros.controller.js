import { Foro } from "../models/foro.js";
import color from "chalk";

// Función para obtener todos los foros
export const getForos = async (req, res) => {
  try {
    // Obtener todos los foros con sus subforos
    const foros = await Foro.findAll({});
    if (foros.length === 0) {
      return res.status(404).json({ message: "No existen foros en el sistema" });
    }
    // Enviar la información de foros y sus subforos
    res.status(200).json({ foros });
  } catch (error) {
    console.log(
      color.red(
        "----------------------------------------------------------------------------"
      )
    );
    console.error(color.red(error));
    console.log(
      color.red(
        "----------------------------------------------------------------------------"
      )
    );
    res.status(500).json({ error: "Error al obtener la información de foros" });
  }
};

export const getForosById = async (req, res) => {
  console.log('hasta aca')
  const user = req.user;
  console.log(user)
  try {
    const foro = await Foro.findAll({ where: { dueño_f: user.id } });
    if (!foro) {
      return res.status(404).json({ error: "Aun no tienes foros creados" });
    }
    res.status(200).json({ foro });
  } catch (error) {
    console.log(color.red("Error al obtener el foro por ID:", error));
    res.status(500).json({ error: "Error al obtener el foro por ID" });
  }
};

// Función para crear un nuevo foro
export const createForo = async (req, res) => {
  const user = req.user || { id: 1 }; // Asignar un usuario de prueba si req.user es undefined
  const { title, desc } = req.body;

  // Verifica si el usuario está definido
  if (!user || !user.id) {
    return res.status(401).json({ message: "No autorizado" });
  }

  try {
    // Validar que los campos title y desc no estén vacíos
    if (!title || !desc) {
      return res.status(400).json({ error: "El título y la descripción son obligatorios" });
    }

    const existF = await Foro.findOne({ where: { nombre: title } });
    if (existF) {
      return res.status(400).json({ error: "El título que desea ingresar ya existe" });
    }

    await Foro.create({
      nombre: title,
      desc,
      dueño_f: user.id, // Asegúrate de que esto corresponda al campo correcto en tu modelo
    });
    res.status(200).json({ message: "El foro ha sido creado exitosamente" });
  } catch (error) {
    console.log(color.red("Error al crear el foro:", error));
    res.status(500).json({ error: "Se produjo un error en el sistema" });
  }
};

// Función para actualizar un foro existente
export const updateForo = async (req, res) => {
  const { title, desc } = req.body;
  const { id } = req.params;

  try {
    console.log(color.yellow("------------------------------------------"));
    console.log(color.yellowBright({ id }));
    console.log(color.yellow("------------------------------------------"));

    const exist = await Foro.findOne({ where: { id } });
    if (!exist) {
      return res.status(404).json({ error: "El foro no existe en el sistema" });
    }

    // Validar que los campos title y desc no estén vacíos
    if (!title || !desc) {
      return res.status(400).json({ error: "El título y la descripción son obligatorios" });
    }

    await Foro.update({ nombre: title, desc }, { where: { id } });
    res.status(200).json({ message: "El contenido del foro ha sido actualizado con éxito" });
  } catch (error) {
    console.log(color.red("Error al actualizar el foro:", error));
    res.status(500).json({ error: "Se produjo un error en el sistema" });
  }
};

// Función para eliminar un foro
export const deleteForo = async (req, res) => {
  const { id } = req.params;
  try {
    const exist = await Foro.findOne({ where: { id } });
    if (!exist) {
      return res.status(404).json({ error: "El foro que desea eliminar no existe en nuestro sistema" });
    }
    await Foro.destroy({ where: { id } });
    res.status(200).json({ message: "El foro ha sido eliminado exitosamente" });
  } catch (error) {
    console.log(color.red("Error al eliminar el foro:", error));
    res.status(500).json({ error: "Se produjo un error en el sistema" });
  }
};
