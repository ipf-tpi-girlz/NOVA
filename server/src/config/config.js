//IMPORTACIONES
import dotenv from "dotenv";

dotenv.config();

//CONFIGURACIÓN
export default {
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    SECRET_KEY: process.env.SECRET_KEY,
    DB_DIALECT: process.env.DB_DIALECT,
};