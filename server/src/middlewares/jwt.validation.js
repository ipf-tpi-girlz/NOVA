import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { Usuario } from "../models/users.js";
const SECRET_KEY = config.SECRET_KEY;

// Middleware para verificar el token JWT
export const validarJWT = async (req, res, next) => {
  try {
    console.log("------------session---------------------\n\n");
    console.log(req.session);
    console.log("------------cookies---------------------\n\n");
    console.log(req.cookies);
    console.log("----------------------------------------");

    // Obtener el token de las cookies o la sesión
    const token = req.cookies.authToken || req.session.token;

    if (!token) {
      return res.status(403).json({ message: "Token no proporcionado" });
    }

    // Verificar el token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Buscar al usuario en la base de datos
    const user = await Usuario.findOne({ where: { id: decoded.userId } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Token inválido o usuario no encontrado" });
    }

    // Agregar el usuario a la request para acceder en el controlador
    req.user = user;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al validar el token", error: error.message });
  }
};
