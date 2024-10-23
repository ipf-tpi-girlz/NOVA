import Usuario from "../models/users.js";
import Perfil from "../models/profile.js";
import bcrypt from "bcryptjs";
import { createToken } from "../healpers/create.jwt.js";
import color from "chalk";

//iniciar sesion
export const loginUser = async (req, res) => {
  const { mail, contrasenia } = req.body;

  console.log("Datos de login:", { mail, contrasenia }); // Debug: Muestra los datos recibidos

  try {
    const user = await Usuario.findOne({ where: { mail } });

    if (!user) {
      return res.status(401).json({ success: false, message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(contrasenia, user.contrasenia);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
    }

    // Generar el token
    const token = await createToken(user.id);
    console.log("Token generado:", token); // Debug: Muestra el token generado

    // Guardar el token en la sesión
    req.session.token = token; // Asegúrate de que estás usando sesiones correctamente

    // Configurar la cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Usa HTTPS en producción
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Cambiar según tu entorno
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
    });

    return res.status(200).json({ success: true, message: "Inicio de sesión exitoso", token }); // Incluye el token en la respuesta si lo deseas

  } catch (error) {
    console.log(color.red(error)); // Imprime el error en consola
    return res.status(500).json({ success: false, message: "Error al iniciar sesión" });
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

  console.log(req.body);

  try {
    const existUser = await Usuario.findOne({ where: { mail } });
    if (existUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashPassword = await bcrypt.hash(contrasenia, 10);
    const newUser = {
      role,
      nombre,
      mail,
      departamento,
      genero,
      localidad,
      contrasenia: hashPassword,
    };

    let perfilData;

    // Determinar los datos del perfil según el rol
    if (role === "profesional") {
      perfilData = {
        nro_matricula,
        nro_telefono,
        especialidad,
      };
    } else if (role === "institucion") {
      perfilData = {
        nro_telefono,
        cuit,
        servi,
        nro_matricula,
        rp_legal,
        direccion,
      };
    } else if (role === "victima") {
      // Para "victima", no se requiere perfil adicional
      perfilData = null;
    } else {
      console.log("Rol no válido", role);
      return res.status(400).json({ message: "Rol no válido" });
    }

    // Crear el usuario
    const newUserRecord = await Usuario.create(newUser);

    // Crear el perfil si es necesario
    if (perfilData) {
      await Perfil.create({
        usuario_id: newUserRecord.id,
        ...perfilData,
      });
    }

    return res.status(200).json({ success: true, message: "Usuario registrado exitosamente" });


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
    return res.status(200).json({ success: true, message: "Sesión cerrada exitosamente" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error inesperado" });
  }
};
