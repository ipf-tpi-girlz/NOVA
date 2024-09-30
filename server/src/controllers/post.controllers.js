import { Publicacion } from "../models/publicacion.js";
import { Subforo } from "../models/subForo.js";
import { CategoriaForo } from "../models/categoriaForo.js";
import { Usuario } from "../models/users.js";
export const getPost = (req, res) => {
  res.send();
};

export const crearPublicacion = (req, res) => {
  const { id } = req.params;
  const { title, img, content, categoria } = req.body;
  try {
    const user = Usuario.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const categoria = CategoriaForo.findOne({ where: { nombre: categoria } });
    const Subforo_id = Subforo.findOne({ where: { categoria_id: categoria.id } });

    if (!Subforo_id) {
      return res.status(404).json({ error: "Esta seccion no ha sido encontrada" });
    }
    const publicacion = Publicacion.create({
      title,
      img,
      content,
      Subforo_id: Subforo_id.id,
      usuario_id: user.id,
    });


  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updatePost = (req, res) => {
  res.send();
};

export const deletePost = (req, res) => {
  res.send();
};
