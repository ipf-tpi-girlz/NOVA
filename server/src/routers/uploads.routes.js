// src/routes/upload.js
import { Router } from 'express';
import { uploadMiddleware } from '../middlewares/multerMiddleware.js';

const multeRouter = Router();

// Ruta para subir imágenes
multeRouter.post('/upload', uploadMiddleware, (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ninguna imagen' });
    }
    res.status(200).json({ message: 'Imagen subida exitosamente', file: req.file });
});

export default router;
