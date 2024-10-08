import { Usuario } from "../models/users.js";
import { Profesional } from "../models/profesional.js";
import { Institucion } from "../models/institucion.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    if (usuarios.length === 0)
      return res.status(404).json({ message: "No se encontraron usuarios" });
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Se produjo un error en el servidor" });
  }
};
export const deleteUser = async (req, res) => {
  const user = req.user;
  const id = user.id;
  try {
    //* Buscar el usuario por ID
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    //! Eliminar el usuario
    await usuario.destroy();
    res.status(200).json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Se produjo un error en el servidor" });
  }
};

import { Usuario } from "../models/users.js";
import { Profesional } from "../models/profesional.js";
import { Institucion } from "../models/institucion.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    role,
    nombre,
    mail,
    departamento,
    localidad,
    contrasenia,
    nro_telefono,
    nro_matricula,
    razon_social,
    direccion,
  } = req.body;

  try {
    // Buscar el usuario por ID
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar los campos que pueden ser modificados
    usuario.nombre = nombre || usuario.nombre;
    usuario.mail = mail || usuario.mail;
    usuario.nro_telefono = nro_telefono || usuario.nro_telefono;

    // Actualizar campos específicos según el rol
    if (role === "profesional") {
      const profesional = await Profesional.findOne({
        where: { usuario_id: usuario.id },
      });
      if (profesional) {
        profesional.nro_matricula = nro_matricula || profesional.nro_matricula;
        await profesional.save();
      } else {
        return res.status(404).json({ message: "Profesional no encontrado" });
      }
    }

    if (role === "institucion") {
      const institucion = await Institucion.findOne({
        where: { usuario_id: usuario.id },
      });
      if (institucion) {
        institucion.direccion = direccion || institucion.direccion;
        institucion.razon_social = razon_social || institucion.razon_social;
        await institucion.save();
      } else {
        return res.status(404).json({ message: "Institución no encontrada" });
      }
    }

    // Si se proporciona una nueva contraseña, hashearla y actualizar
    if (contrasenia) {
      usuario.contrasenia = await bcrypt.hash(contrasenia, 10);
    }

    // Guardar el usuario actualizado
    await usuario.save();

    res
      .status(200)
      .json({ message: "Usuario actualizado exitosamente", usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Se produjo un error en el servidor" });
  }
};
