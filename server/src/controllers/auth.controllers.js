import Usuario from "../models/users.js";
import Perfil from "../models/profile.js";
import color from "chalk";
export const getUsers = async (req, res) => {
  try {
    const users = await Usuario.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

export const getUserById = async (req, res) => {
  const user = req.user;
  console.log(color.green(user.role));
  try {
    if (user.role === "profesional" || user.role === "institucion") {
      const perfil = await Perfil.findOne({ where: { usuario_id: user.id } });
      if (!perfil) {
        return res.status(404).json({ message: "Perfil no encontrado" });
      }
      const userWithProfile = { ...user.toJSON(), perfil: perfil.toJSON() };
      return res.status(200).json(userWithProfile);
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(color.red(error));
    return res
      .status(500)
      .json({ message: "Se produjo un error en el servidor" });
  }
};

export const updateUser = async (req, res) => {
  const user = req.user;
  const {
    nombre,
    mail,
    departamento,
    localidad,
    contrasenia,
    nro_telefono,
    direccion,
    servi,
    especialidad,
  } = req.body;
  try {
    const updateUser = {
      nombre,
      mail,
      departamento,
      localidad,
      contrasenia,
    };
    if (user.role === "profesional") {
      await Usuario.update({ updateUser }, { where: { usuario_id: user.id } });
      const perfil = await Perfil.findOne({ where: { usuario_id: user.id } });
      if (!perfil) {
        return res.status(404).json({ message: "Perfil no encontrado" });
      }
      await perfil.update({
        usuario_id: user.id,
        nro_telefono,
        direccion,
        especialidad: perfil.especialidad + " " + especialidad,
      });
      return res
        .status(200)
        .json("Los datos han sido actualizados correctamente");
    }
    if (user.role === "institucion") {
      await Usuario.update({ updateUser }, { where: { usuario_id: user.id } });
      const perfil = await Perfil.findOne({ where: { usuario_id: user.id } });
      if (!perfil) {
        return res.status(404).json({ message: "Perfil no encontrado" });
      }
      Perfil.update({
        usuario_id: user.id,
        nro_telefono,
        direccion,
        servi,
      });
    }
    await Perfil.update({ updateUser }, { where: { usuario_id: user.id } });
    res.status(200).json("Los datos han sido actualizados correctamente");
  } catch (error) {
    console.log(color.red(error));
    return res
      .status(500)
      .json({ message: "Se produjo un error en el servidor" });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const user = req.user;
    await Usuario.destroy({ where: { id: user.id } });

    res.clearCookie('authToken');

    res.status(200).json("La cuenta ha sido eliminada correctamente");
  } catch (error) {
    console.log(color.red(error));
    return res
      .status(500)
      .json({ message: "Se produjo un error en el servidor" });

  }
};
