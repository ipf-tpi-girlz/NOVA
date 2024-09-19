import { registerProf, loginProf } from "../controllers/user.prof.controllers.js";
import { Router } from "express";

export const routerProf = Router();

//RUTA PARA REGISTRAR
routerProf.post("/user/profesional/register", registerProf);
//RUTA PARA LOGUEAR
routerProf.post("user/profesional/login", loginProf);