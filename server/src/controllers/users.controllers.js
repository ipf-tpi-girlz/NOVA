import Usuario from "../models/users.js";
import Perfil from "../models/profile.js";
import bcrypt from "bcryptjs";
import { createToken } from "../healpers/create.jwt.js";
import color from "chalk";

//iniciar sesion
export const loginUser = async (req, res) => {
  const { mail, contrasenia } = req.body;
  try {
    const user = await Usuario.findOne({ where: { mail } });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }
    const isMatch = await bcrypt.compare(contrasenia, user.contrasenia);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }
    const token = await createToken(user.id);
    req.session.token = token;
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: "production",
      sameSite: "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).send("Inicio de sesion exitoso");
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión" });
    return console.log(color.red(error));
  }
};
//registrar
export const registerUser = async (req, res) => {
  const {
    role,
    nombre,
    mail,
    departamento,
    localidad,
    contrasenia,
    nro_telefono,
    nro_matricula,
    cuit,
    direccion,
    rp_legal,
    servi,
    especialidad,
    genero,
  } = req.body;
  try {
    const existUser = await Usuario.findOne({ where: { mail } });
    if (existUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    console.log(color.green(role, provincia));
    const hashPassword = await bcrypt.hash(contrasenia, 10);
    const newUser = {
      role: role,
      nombre: nombre,
      mail,
      departamento,
      genero,
      localidad,
      contrasenia: hashPassword,
    };
    if (role === "profesional") {
      try {
        const newP = await Usuario.create(newUser);
        await Perfil.create({
          usuario_id: newP.id,
          nro_matricula,
          nro_telefono,
          especialidad,
        });
        return res
          .status(200)
          .json({ message: "Usuario registrado exitosamente" });
      } catch (error) {
        console.log(color.red(`Error al registrar el profesional: ${error}`));
        return res
          .status(500)
          .json({ message: "Error al registrar el usuario" });
      }
    }
    if (role === "institucion") {
      try {
        const newI = await Usuario.create(newUser);
        await Perfil.create({
          usuario_id: newI.id,
          nro_telefono,
          cuit,
          servi,
          nro_matricula,
          rp_legal,
          direccion,
        });
        return res
          .status(200)
          .json({ message: "Usuario registrado exitosamente" });
      } catch (error) {
        console.log(color.red(`Error al registrar la institucion: ${error}`));
        return res
          .status(500)
          .json({ message: "Error al registrar el usuario" });
      }
    }
    if (role === "victima") {
      try {
        await Usuario.create(newUser);
        return res
          .status(200)
          .json({ message: "Usuario registrado exitosamente" });
      } catch (error) {
        console.log(
          color.red(`Error al registrar el usuario normal: ${error}`)
        );
        return res
          .status(500)
          .json({ message: "Error al registrar el usuario" });
      }
    }
    console.log("rol no valido", role);
    return res.status(400).json({ message: "Rol no válido" });
  } catch (error) {
    console.log(color.red(`Error al registrar el usuario: ${error}`));
    return res.status(500).json({ message: "Error al registrar el usuario" });
  }
};
//cerrar sesion
export const logout = async (req, res) => {
  try {
    if (!req.cookies.authToken) {
      console.log(req.cookies.authToken);
      return res.status(400).json({ message: "No hay ninguna sesión activa" });
    }

    // Limpiar la cookie de autenticación
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    // Enviar respuesta exitosa
    return res.status(200).json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error inesperado" });
  }
};
