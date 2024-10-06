import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Obtener __dirname en un módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Verifica si la carpeta 'uploads' existe y, si no, la crea
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuración de almacenamiento con Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Carpeta de destino
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Nombre del archivo con timestamp
  },
});

// Filtro de archivos: solo permitir imágenes (jpeg, jpg, png)
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/; // Tipos permitidos
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Validar extensión
  const mimetype = filetypes.test(file.mimetype); // Validar MIME type

  if (mimetype && extname) {
    cb(null, true); // Aceptar archivo
  } else {
    cb(
      new Error(
        "Formato de archivo no válido. Solo se permiten imágenes en formato jpeg, jpg o png."
      )
    );
  }
};

// Configuración del middleware Multer
export const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Límite de 5MB
  fileFilter: fileFilter,
}).single("img");
