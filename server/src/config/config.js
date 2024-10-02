//IMPORTACIONES
import dotenv from "dotenv";

dotenv.config();

//CONFIGURACIÓN
export default {
    PORT: process.env.PORT || 3000,
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_USER: process.env.DB_USER || "root",
    DB_PASSWORD: process.env.DB_PASS || "",
    DB_NAME: process.env.DB_NAME || "prueba",
    SECRET_KEY: process.env.SECRET_KEY || "secret",
    DB_DIALECT: process.env.DB_DIALECT || "mysql",
};