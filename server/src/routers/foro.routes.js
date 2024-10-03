import { Router } from "express";
import {
  getForos,
  getInfoGeneral,
  createForo,
  deleteForo,
  updateForo,
} from "../controllers/foros.controller.js";
import { validarJWT } from "../middlewares/jwt.validation.js";

export const foroRouter = Router();
//!trae foros y sub foros
foroRouter.get("/", getForos);
//!trae info general de los foros (comentarios y publis)
foroRouter.get("/infoGeneral", getInfoGeneral);
//!crea foros
foroRouter.post("/create", validarJWT, createForo);
//!edita foros
foroRouter.put("/update/:id", updateForo);
//!elimina foros
foroRouter.delete("/delete/:id", deleteForo);
