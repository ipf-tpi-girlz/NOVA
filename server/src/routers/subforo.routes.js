import { Router } from 'express'
import { createSubForo, getSubforos, updateSubForo, deleteSubForo } from '../controllers/subForos.controllers.js'
import { validarJWT } from '../middlewares/jwt.validation.js';
export const subForoRouter = Router();



//!trae subforos
subForoRouter.get('/', getSubforos);
//!crear subforo
subForoRouter.post('/:id', validarJWT, createSubForo);
//!eliminar subforo
subForoRouter.delete(' /:id', validarJWT, deleteSubForo);
//!actualizar subforo
subForoRouter.put('/:id', validarJWT, updateSubForo);
