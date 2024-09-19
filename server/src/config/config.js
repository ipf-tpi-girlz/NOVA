//IMPORTACIONES
import dotenv from "dotenv";

dotenv.config();

//CONFIGURACIÓN
//*Configuracion para mantener la seguridad de los datos
export default {
    PORT: process.env.PORT || 4000,
    DB_NAME: process.env.DB_NAME || "prueba",
    SECRET_KEY: process.env.SECRET_KEY || "mi_secreto_del_token",
};