import { Publicacion } from "../models/publicacion.js";
import { Subforo } from "../models/subForo.js";
import { CategoriaForo } from "../models/categoriaForo.js";
import { Usuario } from "../models/users.js";
export const getPost = (req, res) => {

};

export const crearPublicacion = async (req, res) => {
  const { id } = req.params; // ID del usuario
  const { title, img, content, categoria_foro, name_subforo } = req.body; // Datos de la publicación

  try {
    // Verificar si el usuario existe
    const user = await Usuario.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar si existe la categoría
    const categoria = await CategoriaForo.findOne({ where: { nombre: categoria_foro } });
    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    // Verificar si hay un subforo asociado a esa categoría
    const S_foro = await Subforo.findOne({ where: { categoria_id: categoria.id, title: name_subforo } });
    if (!S_foro) {
      return res.status(404).json({ error: "Subforo no encontrado para esta categoría" });
    }

    // Crear la publicación
    const nuevaPublicacion = await Publicacion.create({
      title,
      img,
      content,
      subforo_id: S_foro.id,
      usuario_id: user.id,
    });

    return res.status(200).json({ message: "Publicación creada exitosamente", publicacion: nuevaPublicacion });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al crear la publicación" });
  }
};


export const updatePost = (req, res) => {
  res.send();
};

export const deletePost = (req, res) => {
  res.send();
};
