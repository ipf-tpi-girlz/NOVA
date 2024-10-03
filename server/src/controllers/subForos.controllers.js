import { Usuario } from "../models/users.js";
import { Subforo } from "../models/subForo.js";
import color from "chalk";

export const getSubforos = async (req, res) => {
  try {
    // Obtener todos los subforos con sus publicaciones, comentarios y respuestas
    const subforos = await Subforo.findAll({
      include: [
        {
          model: Publicacion,
          as: "publicaciones",
          include: [
            {
              model: Usuario,
              as: "usuario",
              attributes: ["nombre", "mail"], // Información básica del usuario
            },
            {
              model: Comentario,
              as: "comentarios",
              include: [
                {
                  model: Usuario,
                  as: "usuario",
                  attributes: ["nombre", "mail"], // Autor del comentario
                },
                {
                  model: Respuesta,
                  as: "respuestas",
                  include: [
                    {
                      model: Usuario,
                      as: "usuario",
                      attributes: ["nombre", "mail"], // Autor de la respuesta
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    // Enviar la información de subforos, publicaciones, comentarios y respuestas
    res.status(200).json({
      message: "Información de subforos obtenida con éxito",
      data: subforos,
    });
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
  const user = req.user;
  const { title, desc } = req.body;
  const id = user.id;
  console.log(
    color.bgBlue(
      "----------------------------------------------------------------------------------------------------"
    )
  );
  console.log(color.bgBlue(id));
  console.log(
    color.bgBlue(
      "----------------------------------------------------------------------------------------------------"
    )
  );
  try {
    const userExist = await Usuario.findOne({ where: { id: id } });

    if (!userExist) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado en nuestro sistema" });
    }

    //! Verificar si el usuario es una institución o un profesional (debe tener al menos uno de estos roles)
    if (user.role !== "institucion" && user.role !== "profesional") {
      return res.status(400).json({
        message:
          "Solo instituciones o profesionales pueden crear nuevas secciones",
      });
    }
    //!validar si existe el titulo
    const existSubF = await Subforo.findOne({ where: { title } });
    if (existSubF)
      return res.status(400).json({
        message: "El titulo que desea ingresar ya existe en nuestro sistema",
      });
    //* Crear el subforo
    await Subforo.create({
      title,
      desc,
      moderador_id: id,
    });

    res.status(200).json({ message: "Seccion creada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const updateSubForo = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const id_user = user.id;
  try {
  } catch (error) {}
};

export const deleteSubForo = (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const id_user = user.id;
};
