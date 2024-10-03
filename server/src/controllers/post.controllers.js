import { Publicacion } from "../models/publicacion.js";
import { Subforo } from "../models/subForo.js";
import { CategoriaForo } from "../models/categoriaForo.js";
import { Usuario } from "../models/users.js";



export const createPost = async (req, res) => {
  const user = req.user
  const { id } = req.params
  const { title, content } = req.body
  const img = req.file ? req.file.path : null;
  try {
    const existUser = await Usuario.findAll({ where: { id: user.id } })
    if (existUser.length === 0) return res.status(404).json({ message: "Usuario no encontrado en nuestro sistema" });
    const existSubForo = await Subforo.findAll({ where: { id } })
    if (existSubForo.length === 0) return res.status(404).json({ message: "Seccion no encontrada" });
    const existPost = await Publicacion.findAll({ where: { title: title } })
    if (existPost.length > 0) return res.status(400).json({ message: "El titulo que desea ingresar ya existe" });

    await Publicacion.create({ title, img, content, subforo_id: id, usuario_id: user.id })
    res.status(200).json({ message: "Publicacion creada exitosamente" })

  } catch (error) {

  }
};

export const crearPublicacion = async (req, res) => {

};


export const updatePost = (req, res) => {
  res.send();
};

export const deletePost = (req, res) => {
  res.send();
};
