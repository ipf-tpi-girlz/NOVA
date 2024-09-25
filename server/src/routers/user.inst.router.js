import { registerInst, loginInst } from "../controllers/user.inst.controller.js";
import { Router } from "express";

export const routerInst = Router();

//RUTA PARA REGISTRAR
routerInst.post("/register", registerInst);
//RUTA PARA LOGUEAR
//routerInst.post("user/institucion/login", loginInst);