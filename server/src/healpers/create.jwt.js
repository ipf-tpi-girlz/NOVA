import jwt from "jsonwebtoken";
import config from "../config/config.js";

const SECRET_KEY = config.SECRET_KEY;

export const createToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = { userId };
        jwt.sign(
            payload,
            SECRET_KEY,
            {
                expiresIn: "24h",
            },
            (error, token) => {
                if (error) {
                    console.log(error);
                    reject("No se pudo generar el token");
                } else {
                    resolve(token);
                }
            }
        );
    });
};