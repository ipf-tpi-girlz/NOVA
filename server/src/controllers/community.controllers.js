import Comunidad from "../models/comunnity.js";
import color from "chalk";
import ParticipanteComunidad from "../models/join.comunity.js";
import Usuario from "../models/users.js";
import PublicacionComunidad from "../models/post.community.js";
import Comentario from "../models/coments.js";

export const getCommunity = async (req, res) => {
  try {
    const community = await Comunidad.findAll();
    console.log(color.green(`Comunidades encontradas: ${community}`));
    return res.status(200).json({ community });
  } catch (error) {
    console.log(color.red(error));
  }
};

export const community = async (req, res) => {
  const { id } = req.params;
  try {
    const community = await Comunidad.findOne({
      where: { id },
      include: [
        {
          model: PublicacionComunidad,
          as: "publicaciones",
          include: [
            {
              model: Comentario,
              as: "comentarios",
              include: [
                {
                  model: Usuario,
                  as: "usuario"
                }
              ]
            },
            {
              model: Usuario,
              as: "usuario"
            }
          ]
        },
        {
          model: ParticipanteComunidad,
          as: "participantes",
          include: [
            {
              model: Usuario,
              as: "usuario"
            }
          ]
        }
      ]
    });

    if (!community) {
      console.log(color.red("Comunidad no encontrada"));
      return res.status(404).json({ message: "Comunidad no encontrada" });
    }

    const moderador = await Usuario.findOne({
      where: { id: community.moderador_id }
    });

    if (!moderador) {
      console.log(color.red("Moderador no encontrado"));
      return res.status(404).json({ message: "Moderador no encontrado" });
    }

    console.log(color.green(`Comunidad encontrada: ${community.nombre}`));
    console.log(color.green(`Moderador encontrado: ${moderador.nombre}`));

    return res.status(200).json({
      community,
      moderador: {
        id: moderador.id,
        nombre: moderador.nombre,
        img: moderador.img || null // Imagen del moderador (si está disponible)
      }
    });
  } catch (error) {
    console.error(color.red("Error al obtener la comunidad"), error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};


export const getCommunityID = async (req, res) => {
  const user = req.user;
  try {
    const community = await Comunidad.findAll({
      where: { moderador_id: user.id },
    });
    if (community.length === 0) {
      console.log(color.red("No posee comunidades"));
      return res.status(404).json({ message: "No posee comunidades" });
    }
    console.log(color.green(`Comunidad encontrada: ${community}`));
    return res.status(200).json({ community });
  } catch (error) {
    console.log(color.red(error));
    res.status(500).json({ message: "Se produjo un error en el servidor" });
  }
};

export const createCommunity = async (req, res) => {
  const user = req.user;
  const { nombre, desc } = req.body;
  try {
    if (user.role !== "institucion" && user.role !== "profesional") {
      console.log(color.red("No puede crear una comunidad"))
      return res.status(403).json({ message: "Solo las instituciones y profesionales pueden crear una comunidad" });
    }

    await Comunidad.create({
      nombre,
      desc,
      img_perfil: req.file ? req.file.path : null,
      moderador_id: user.id,
    });
    console.log(color.blue(`Comunidad creada`));
    return res.status(201).json({ message: "Comunidad creada" });
  } catch (error) {
    console.log(color.red(error));
    res.status(500).json({ message: "Se produjo un error en el servidor" });
  }
};

export const updateCommunity = async (req, res) => {
  const user = req.user
  const { id } = req.params;
  const { nombre, desc } = req.body;
  try {
    const community = await Comunidad.findOne({ where: { id } });
    if (!community) {
      console.log(color.red("No se encontro la comunidad"))
      return res.status(404).json({ message: "No se encontro la comunidad" })
    }
    if (community.moderador_id !== user.id) {
      console.log(color.red("No puede modificar esta comunidad"))
      return res.status(403).json({ message: "Solo puedes modificar tus comunidades" })
    }
    await Comunidad.update({
      nombre,
      desc,
    }, { where: { id } })
    if (req.file) {
      await Comunidad.update({
        img_perfil: req.file ? req.file.path : null
      }, { where: { id } })

    }
    console.log(color.blue(`Comunidad actualizada`))
    return res.status(200).json({ message: "Comunidad actualizada" })
  }
  catch (error) {
    console.log(color.red(error))
    res.status(500).json({ message: "Se produjo un error en el servidor" })
  }
}

export const deleteCommunity = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  try {
    const community = await Comunidad.findOne({ where: { id } });
    if (!community) {
      console.log(color.red("No se encontro la comunidad"));
      return res.status(404).json({ message: "No se encontro la comunidad" });
    }
    if (community.moderador_id !== user.id) {
      console.log(color.red("No puede eliminar esta comunidad"));
      return res
        .status(403)
        .json({ message: "Solo puedes eliminar tus comunidades" });
    }
    await Comunidad.destroy({ where: { id } });
    console.log(color.blue(`Comunidad eliminada`));
    return res.status(200).json({ message: "Comunidad eliminada" });
  } catch (error) {
    console.log(color.red(error));
    res.status(500).json({ message: "Se produjo un error en el servidor" });
  }
};
