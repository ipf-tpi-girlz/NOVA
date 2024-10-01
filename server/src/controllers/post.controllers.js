import { Publicacion } from "../models/publicacion.js";
import { Subforo } from "../models/subForo.js";
import { CategoriaForo } from "../models/categoriaForo.js";
import { Usuario } from "../models/users.js";



export const getPost = async (req, res) => {
  const { id } = req.params
  const { title, categoria } = req.body
  try {
    const existUser = await Usuario.findOne({ where: { id } })
    if (!existUser) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }
    const categoriaFor = await CategoriaForo.findOne({ where: { nombre: categoria } })
    const existF = await Subforo.findOne({ where: { title: title, categoria_id: categoriaFor.id } })

    if (!existF) {
      return res.status(404).json({ message: "Seccion no encontrada" })
    }
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
