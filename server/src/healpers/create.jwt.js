
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const SECRET_KEY = config.SECRET_KEY;

export default (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId };
    jwt.sign(
      payload,
      SECRET_KEY,
      {
        expiresIn: "4h",
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