import { Router } from "express";
import {
  getCommunity,
  getCommunityID,
  createCommunity,
  updateCommunity,
  deleteCommunity,
} from "../controllers/community.controllers.js";
import { validarJWT } from "../middlewares/jwt.validation.js";
import upload from "../middlewares/img.middleware.js";

const routerComunity = Router();

routerComunity.get("/", getCommunity);
routerComunity.post("/create", upload.single("img_perfil"), createCommunity);
routerComunity.put("/update/:id", upload.single("img_perfil"), updateCommunity);
routerComunity.delete("/delete/:id", deleteCommunity);

export default routerComunity;
