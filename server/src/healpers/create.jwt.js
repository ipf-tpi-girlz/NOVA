import jwt from "jsonwebtoken";
import config from "../config/config.js";


export function createToken(user) {
    try {
        const payload = {
            id: user.id,
            name: user.name,
            role: user.role
        };
        const options = {
            expiresIn: '24h'
        };
        const token = jwt.sign(payload, config.SECRET_KEY, options);
        return token;
    } catch (error) {
        console.error('Se produjo un error al crear el token:', error);
    }
}

