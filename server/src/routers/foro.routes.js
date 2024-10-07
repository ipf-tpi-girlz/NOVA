import { Router } from "express";
import {
  getForos,
  createForo,
  deleteForo,
  updateForo,
} from "../controllers/foros.controller.js";
import { validarJWT } from "../middlewares/jwt.validation.js";

export const foroRouter = Router();


//!trae foros y sub foros
foroRouter.get("/", getForos);
//!crea foros
foroRouter.post("/create", createForo);
//!edita foros
foroRouter.put("/update/:id", updateForo);
//!elimina foros
foroRouter.delete("/delete/:id", deleteForo);
