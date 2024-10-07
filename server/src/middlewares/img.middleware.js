import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Obtener __dirname en un módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Verifica si la carpeta 'uploads' existe y, si no, la crea
const uploadsDir = path.join(process.cwd(), "uploads"); // Asegúrate de que apunte a la raíz
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true }); // Crear la carpeta si no existe
}

// Configuración de almacenamiento con Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Guardar en la carpeta uploads
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname).toLowerCase();
    const filename = `${timestamp}_${file.originalname.replace(/\s+/g, "_")}`;
    cb(null, filename);
  },
});

// Filtro de archivos: solo permitir imágenes (jpeg, jpg, png)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  ); // Validar extensión
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true); // Aceptar el archivo
  } else {
    cb(
      new Error(
        `Formato de archivo no válido. Se permiten solamente imágenes en formato jpeg, jpg o png. Se recibió: ${file.mimetype}`
      )
    );
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Límite de tamaño de archivo a 5MB
  fileFilter: fileFilter,
}).single("img");
