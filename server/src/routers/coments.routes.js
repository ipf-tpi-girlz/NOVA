import { Router } from 'express'
import { createComment, getComment, updateComment, deleteComment } from '../controllers/coments.controllers.js'
import { validarJWT } from '../middlewares/jwt.validation.js';
export const comentRouter = Router();

comentRouter.post('/create/:id', validarJWT, createComment);
comentRouter.get('/:id', getComment);
comentRouter.put('/update/:id', validarJWT, updateComment);
comentRouter.delete('/delete/:id', validarJWT, deleteComment);