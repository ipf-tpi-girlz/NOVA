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

// Actualizar perfil de usuario (incluye imagen de perfil)
export const UpdateProfile = async (req, res) => {
  try {
    const user = { id: 1 }; // ID del usuario para pruebas

    let perfil = await PerfilUsuario.findOne({
      where: { usuario_id: user.id },
    });

    if (!perfil) {
      perfil = await PerfilUsuario.create({
        usuario_id: user.id,
        description: req.body.description || "Descripción por defecto",
        img: req.file ? req.file.filename : "ruta/a/default.jpg",
      });
    } else {
      if (req.file) {
        perfil.img = req.file.filename; // Almacena solo el nombre
      }
      perfil.description = req.body.description || perfil.description;
      await perfil.save();
    }

    const fullImgPath = `http://localhost:4000/uploads/${perfil.img}`; // Construye la URL completa correctamente

    res.status(200).json({
      message: "Perfil actualizado correctamente",
      perfil: { ...perfil.toJSON(), img: fullImgPath },
    });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    res
      .status(500)
      .json({ error: "Se produjo un error al actualizar el perfil" });
  }
};

// Obtener la foto de perfil del usuario
export const getUserProfilePicture = async (req, res) => {
  const userId = 1; // ID de usuario para pruebas

  try {
    const perfil = await PerfilUsuario.findOne({
      where: { usuario_id: userId },
    });

    // Verificar si el perfil existe
    if (!perfil || !perfil.img) {
      return res
        .status(404)
        .json({ message: "Perfil o imagen no encontrada." });
    }

    // Construir la URL completa de la imagen
    const fullImgPath = `http://localhost:4000/uploads/${perfil.img}`;

    res.status(200).json({
      message: "Imagen de perfil obtenida correctamente.",
      img: fullImgPath,
    });
  } catch (error) {
    console.error("Error al obtener la imagen de perfil:", error);
    return res
      .status(500)
      .json({ error: "Se produjo un error al obtener la imagen de perfil." });
  }
};

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

export const update2User = async (req, res) => {
  const user = req.user;
  const {
    nombre_apellido,
    departamento,
    localidad,
    contrasenia,
    nro_telefono,
    genero,
  } = req.body;

  try {
    // Verificar si el usuario existe
    const existUser = await Usuario.findOne({ where: { id: user.id } });
    if (!existUser) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado en nuestro sistema" });
    }

    // Validar el departamento si se proporciona
    if (departamento) {
      const dep = await Departamento.findOne({
        where: { nombre: departamento },
      });
      if (!dep) {
        return res.status(400).json({
          error: "El departamento ingresado no existe en nuestro sistema",
        });
      }
    }

    // Validar la localidad si se proporciona
    if (localidad) {
      const loc = await Localidad.findOne({
        where: { nombre: localidad, departamento_id: existUser.localidad_id },
      });
      if (!loc) {
        return res.status(400).json({
          error: "La localidad ingresada no existe en nuestro sistema",
        });
      }
    }

    // Cifrar la nueva contraseña si se proporciona
    let hashedPassword;
    if (contrasenia) {
      hashedPassword = await bcrypt.hash(contrasenia, 10);
    }

    // Actualizar usuario
    await Usuario.update(
      {
        nombre: nombre_apellido,
        localidad_id: localidad ? loc.id : existUser.localidad_id,
        contrasenia: hashedPassword || existUser.contrasenia,
        genero,
        nro_telefono,
      },
      { where: { id: user.id } }
    );

    // Actualizar información adicional según el rol
    if (existUser.role === "profesional") {
      await Profesional.update(
        {
          especialidad: req.body.especialidad || existUser.especialidad,
        },
        { where: { usuario_id: user.id } }
      );
    } else if (existUser.role === "institucion") {
      await Institucion.update(
        {
          cuit: req.body.cuit || existUser.cuit,
          direccion: req.body.direccion || existUser.direccion,
          nro_telefono: req.body.nro_telefono || existUser.nro_telefono,
          rp_legal: req.body.rp_legal || existUser.rp_legal,
        },
        { where: { usuario_id: user.id } }
      );
    }

    // Responder con éxito
    res.status(200).json({ message: "Usuario actualizado exitosamente" });
  } catch (error) {
    console.log(
      color.red("-------------------------------------------------------------")
    );
    console.log(color.redBright(error));
    console.log(
      color.red("-------------------------------------------------------------")
    );
    res.status(500).json({ error: "Error en el servidor" });
  }
};

