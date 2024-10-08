import { Foro } from "../models/foro.js";
import color from "chalk";
export const getForos = async (req, res) => {
  try {
    // Obtener todos los foros con sus subforos
    const foros = await Foro.findAll({});
    if (foros.length === 0)
      return res
        .status(404)
        .json({ message: "No existen foros en el sistema" });
    // Enviar la información de foros y sus subforos
    res.status(200).json({});
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

export const getInfoGeneral = async (req, res) => {
  try {
    // Obtener todos los foros con sus subforos
    const foros = await Foro.findAll({});
    if (foros.length === 0) return res.status(404).json({ message: "No existen foros en el sistema" });
    // Enviar la información de foros, subforos, publicaciones, comentarios y respuestas
    res.status(200).json({ foros });
  } catch (error) {
    console.log(
      color.red(
        "----------------------------------------------------------------------------"
      )
    );
    console.error(error);
    console.log(
      color.red(
        "----------------------------------------------------------------------------"
      )
    );
    res.status(500).json({ error: "Error al obtener la información del foro" });
  }
};

export const createForo = async (req, res) => {
  const user = req.user;
  const { title, desc } = req.body;
  // if (!user) {
  //   return res.status(401).json({ message: "No autorizado" });
  // }
  try {
    const existF = await Foro.findOne({ where: { nombre: title } });
    if (existF)
      return res
        .status(400)
        .json({ error: "El titulo que desea ingresar ya existe" });

    await Foro.create({
      nombre: title,
      desc,
    });
    res.status(200).json({ message: "El foro ha sido creado exitosamente" });
  } catch (error) {
    console.log(
      color.red(
        "----------------------------------------------------------------------------"
      )
    );
    console.log(color.red(error));
    console.log(
      color.red(
        "----------------------------------------------------------------------------"
      )
    );
    res.status(500).json({ error: "Se produjo un error en el sistema" });
  }
};

export const updateForo = async (req, res) => {
  const { title, desc } = req.body;
  const { id } = req.params;
  try {
    console.log(color.yellow("------------------------------------------"));
    console.log(color.yellowBright({ id }));
    console.log(color.yellow("------------------------------------------"));

    const exist = await Foro.findOne({ where: { id } });
    if (!exist)
      return res.status(400).json({
        error: "El que desea actualizar foro no existe en el sistema",
      });

    await Foro.update({ title, desc }, { where: { id } });

    res.status(200).json({ message: "El contenido del foro ha sido realizado con exito" });
  } catch (error) {
    console.log(color.red("-------------------------------------------------------------"));
    console.log(color.redBright(error));
    console.log(color.red("-------------------------------------------------------------"));
  }
};

export const deleteForo = async (req, res) => {
  const { id } = req.params;
  try {
    const exist = await Foro.findOne({ where: { id } });
    if (!exist)
      return res.status(400).json({ error: "El foro que desea eliminar no existe en nuestro sistema", })
    await Foro.destroy({ where: { id } });
    res.status(200).json({ message: "El foro ha sido eliminado exitosamente" });
  } catch (error) {
    console.log(color.red("-------------------------------------------------------------"));
    console.log(color.redBright(error));
    console.log(color.red("-------------------------------------------------------------"));
    res.status(500).json({ error: "Se produjo un error en el sistema" });
  }
};
