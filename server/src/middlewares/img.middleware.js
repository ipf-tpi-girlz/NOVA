import { v2 as cloudinary } from "cloudinary";
import config from "../config/config.js";
import crypto from "node:crypto";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

const fileFilter = (_req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "image/tiff",
    "image/bmp",
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Formato de archivo no permitido. Solo se aceptan imágenes (JPEG, PNG, WEBP, SVG, TIFF, BMP) y GIFs."
      )
    );
  }
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => {
    return {
      folder: "uploads",
      public_id: `${file.fieldname}-${crypto.randomUUID().toString()}`,
      transformation: [{ width: 500, height: 500, crop: "fill" }],
    };
  },
});

const upload = multer({ storage, fileFilter });

export default upload;
