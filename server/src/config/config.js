//IMPORTACIONES
import dotenv from "dotenv";

dotenv.config();

//CONFIGURACIÓN
//*Configuracion para mantener la seguridad de los datos
export default {
    PORT: process.env.PORT || 4000,
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_USER: process.env.DB_USER || "root",
    DB_PASSWORD: process.env.DB_PASSWORD || "root",
    DB_NAME: process.env.DB_NAME || "nova",
    SECRET_KEY: process.env.SECRET_KEY || "mi_secreto_del_token",
};