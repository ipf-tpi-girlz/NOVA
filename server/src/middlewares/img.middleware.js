// src/middlewares/multerMiddleware.js
import multer from 'multer';
import path from 'path';

// Configuración de Multer
const storage = multer.diskStorage({
    //!en el frontend debe entrar como name= "file"
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes y videos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Renombrar el archivo
    }
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
    // Aceptar solo imágenes y videos
    const filetypes = /jpg|jpeg|png|gif|mp4|mov|avi/; // Tipos de archivo permitidos
    const mimetype = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetypeCheck = filetypes.test(file.mimetype);

    if (mimetype && mimetypeCheck) {
        return cb(null, true); // Acepta el archivo
    }
    cb(new Error('Error: Tipo de archivo no permitido')); // Rechaza el archivo
};

// Crea el middleware
const upload = multer({
    storage,
    fileFilter
});


export const uploadMiddleware = upload.single('file');

