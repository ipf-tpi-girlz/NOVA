import { Router } from "express";
import { obtenerInfoGeneralForo, eliminarForo } from "../controllers/foros.controller.js"


export const foroRouter = Router()

foroRouter.get('/', obtenerInfoGeneralForo);

foroRouter.delete('/borrar', eliminarForo)