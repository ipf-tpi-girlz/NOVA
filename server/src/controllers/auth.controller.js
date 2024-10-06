import { Usuario } from "../models/users.js";
import { PerfilUsuario } from "../models/perfil.usario.js";
import color from "chalk";
import path from "path";

// Obtener información de usuario
export const getUsers = async (req, res) => {
  const user = req.user;

  // Verificar que el usuario esté autenticado
  if (!user || !user.id) {
    console.log(user);
    return res.status(401).json({ message: "No autorizado" });
  }

  try {
    // Buscar al usuario por su ID
    const usuario = await Usuario.findByPk(user.id);

    // Verificar si el usuario existe
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Devolver los datos del usuario
    res.status(200).json(usuario);
  } catch (error) {
    console.log(
      color.red("-------------------------------------------------------------")
    );
    console.log(color.redBright(error));
    console.log(
      color.red("-------------------------------------------------------------")
    );
    return res.status(500).json({ error: "Se produjo un error en el sistema" });
  }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  const user = req.user;
  try {
    // Buscar el usuario por ID
    const usuario = await Usuario.findOne({ where: { id: user.id } });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Eliminar el usuario
    await Usuario.destroy({ where: { id: user.id } });
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.log(
      color.red("-------------------------------------------------------------")
    );
    console.log(color.redBright(error));
    console.log(
      color.red("-------------------------------------------------------------")
    );
    return res.status(500).json({ error: "Se produjo un error en el sistema" });
  }
};

// Actualizar perfil de usuario (incluye imagen de perfil)
export const updateUser = async (req, res) => {
  try {
    const user = { id: 1 }; // ID del usuario para pruebas

    let perfil = await PerfilUsuario.findOne({
      where: { usuario_id: user.id },
    });

    if (!perfil) {
      perfil = await PerfilUsuario.create({
        usuario_id: user.id,
        description: req.body.description || "Descripción por defecto",
        img: req.file
          ? path.join("uploads", req.file.filename)
          : "ruta/a/default.jpg",
      });
    } else {
      if (req.file) {
        perfil.img = path.join("uploads", req.file.filename);
      }
      perfil.description = req.body.description || perfil.description;
      await perfil.save();
    }

    res
      .status(200)
      .json({ message: "Perfil actualizado correctamente", perfil });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    res
      .status(500)
      .json({ error: "Se produjo un error al actualizar el perfil" });
  }
};
