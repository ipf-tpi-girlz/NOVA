//IMPORTACIONES
import dotenv from "dotenv";

dotenv.config();

//CONFIGURACIÓN
export default {
    PORT: process.env.PORT || 4000,
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_USER: process.env.DB_USER || "root",
    DB_PASSWORD: process.env.DB_PASS || "",
    DB_NAME: process.env.DB_NAME || "prueba",
    SECRET_KEY: process.env.SECRET_KEY || "secret",
    DB_DIALECT: process.env.DB_DIALECT || "mysql",
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "dabqo6uzf",
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "658238554813149",
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "4cp358sF54FonQqZA38XV8N90AA",
};