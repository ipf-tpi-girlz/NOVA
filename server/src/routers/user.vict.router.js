import { registerVict } from "../controllers/user.vict.controller.js";
import { Router } from "express";

export const routerVict = Router();

//RUTA PARA REGISTRAR
routerVict.post("/register", registerVict);
//RUTA PARA LOGUEAR
//routerVict.post("user/victima/login", loginVict);