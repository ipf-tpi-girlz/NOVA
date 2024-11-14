import Usuario from "../models/users.js";
import Perfil from "../models/profile.js";
import color from "chalk";
import bcrypt from "bcryptjs";
export const getUsers = async (req, res) => {
  try {
    const users = await Usuario.findAll({
      where: { role: 'profesional' },
      include: [
        {
          model: Perfil,
          as: 'perfil',
        },
      ],
    });

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los usuarios y perfiles" });
  }
};
export const getUserProf = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(color.green(id));

    const users = await Usuario.findAll({
      where: { id: id },
      include: [
        {
          model: Perfil,
          as: 'perfil',
        },
      ],
    });

    // Cambiar la verificación a la longitud del array
    if (users.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    console.log(color.green(users)); // Cambié 'user' por 'users' para reflejar el cambio
    res.status(200).json(users); // Devolver todos los usuarios encontrados
  } catch (error) {
    console.log(color.red(error));
    return res.status(500).json({ message: "Se produjo un error en el servidor" });
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
export const updatePassword = async (req, res) => {
  const { contrasenia, nueva_contrasenia } = req.body;
  const user = req.user;
  console.log(color.blue(contrasenia, nueva_contrasenia));

  if (!user) {
    return res.status(401).json({ message: "Usuario no autenticado" });
  }

  try {
    const isPassword = await bcrypt.compare(contrasenia, user.contrasenia);
    if (!isPassword) {
      console.log(color.red("Contraseña incorrecta"));
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const hashedPassword = await bcrypt.hash(nueva_contrasenia, 10);
    const updatedPassword = await Usuario.update(
      { contrasenia: hashedPassword },
      { where: { id: user.id } }
    );

    console.log("Resultado de la actualización:", updatedPassword);

    if (updatedPassword[0] === 0) {
      console.log(color.red("La contraseña no ha sido actualizada"));
      return res.status(400).json({ message: "La contraseña no ha sido actualizada" });
    }

    return res.status(200).json({ message: "La contraseña ha sido actualizada correctamente" });
  } catch (error) {
    console.log(color.red(error));
    return res.status(500).json({ message: "Se produjo un error en el servidor" });
  }
}
export const updateUser = async (req, res) => {
  const user = req.user;
  const id = user.id;
  const { nombre, departamento, localidad, nro_telefono, direccion, especialidad } = req.body;

  try {
    const updateUser = {
      nombre,
      departamento,
      localidad
    };

    if (req.file) {
      updateUser.img = req.file.path;
    }

    console.log("URL de imagen guardada:", updateUser.img);

    if (user.role === "profesional") {
      const userUpdateResult = await Usuario.update(updateUser, { where: { usuario_id: id } });

      if (userUpdateResult[0] === 0) {
        return res.status(404).json({ message: "Usuario no encontrado o no actualizado" });
      }

      const perfil = await Perfil.findOne({ where: { usuario_id: id } });
      if (!perfil) {
        return res.status(404).json({ message: "Perfil no encontrado" });
      }

      const updatedEspecialidad = perfil.especialidad
        ? `${perfil.especialidad} ${especialidad || ''}`.trim()
        : especialidad;

      await perfil.update({
        nro_telefono,
        direccion,
        especialidad: updatedEspecialidad,
      });

      return res.status(200).json({ message: "Los datos han sido actualizados correctamente" });
    }

    if (user.role === "victima") {
      const userUpdateResult = await Usuario.update(updateUser, { where: { id } });

      if (userUpdateResult[0] === 0) {
        return res.status(404).json({ message: "Perfil no encontrado o no actualizado" });
      }

      return res.status(200).json({ message: "Los datos han sido actualizados correctamente" });
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: "Se produjo un error en el servidor" });
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
