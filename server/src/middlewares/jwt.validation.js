import jwt from "jsonwebtoken";
import config from "../config/config.js";
import Usuario from "../models/users.js";
import color from "chalk";
const SECRET_KEY = config.SECRET_KEY;

// Middleware para verificar el token JWT
export const validarJWT = async (req, res, next) => {
  try {

    const token = req.cookies.authToken || req.session.token;
    console.log(token);
    if (!token) {
      return res.status(403).json({ message: "Token no proporcionado" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    const user = await Usuario.findOne({ where: { id: decoded.userId } });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Token inválido o usuario no encontrado", user });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al validar el token", error: error.message });
  }
};
