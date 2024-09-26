
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { Usuario } from "../models/users.js";
const SECRET_KEY = config.SECRET_KEY

// Middleware para verificar el token JWT
export default (req, res, next) => {
    console.log("------------session---------------------\n\n");
    console.log(req.session);
    console.log("------------cookies---------------------\n\n");
    console.log(req.cookies);
    console.log("----------------------------------------");
    const token = req.cookies.authToken || req.session.token;

    if (!token) {
        return res.status(403).json({ message: "Token no proporcionado" });
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    //* Se busca al usuario en la base de datos
    const user = Usuario.findAll({ where: { id: decoded.userId } });

    if (!user) {
        return res.status(401).json({ message: "Token inválido" });
    }

    req.user = user; // Agrega la información del usuario decodificada al request

    next();
};