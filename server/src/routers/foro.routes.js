import { Router } from "express";
import {
  getForos,
  createForo,
  deleteForo,
  updateForo,
  getForosById
} from "../controllers/foros.controller.js";
import { validarJWT } from "../middlewares/jwt.validation.js";

export const foroRouter = Router();


//!trae foros y sub foros
foroRouter.get("/", getForos);
//!trae foros por id
foroRouter.get("/user", validarJWT, getForosById);
//!crea foros
foroRouter.post("/create", createForo);
//!edita foros
foroRouter.put("/update/:id", updateForo);
//!elimina foros
foroRouter.delete("/delete/:id", deleteForo);
