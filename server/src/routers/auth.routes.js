import { Router } from "express";
import { deleteUser, updateUser, getUsers } from '../controllers/auth.controller.js'
import { validarJWT } from "../middlewares/jwt.validation.js";
export const authRouter = Router();



//!trae usuarios
authRouter.get('/', getUsers);
//!eliminar usuario
authRouter.delete('/:id', validarJWT, deleteUser);
//!actualizar usuario
//authRouter.put('/:id', updateUser) //!pendiente













