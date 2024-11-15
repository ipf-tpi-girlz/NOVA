import { Router } from "express";
import {
  getCommunity,
  getCommunityID,
  createCommunity,
  updateCommunity,
  deleteCommunity,
  community,
} from "../controllers/community.controllers.js";
import { validarJWT } from "../middlewares/jwt.validation.js";

const routerComunity = Router();

routerComunity.get("/general/:id", community); // trae comunidad con sus úblicaciones y comentarios y usuarios que comentaron
routerComunity.get("/", getCommunity); //trae todos los post de el grupo
routerComunity.get("/user:id", validarJWT, getCommunityID);
routerComunity.post("/create", validarJWT, createCommunity);
routerComunity.put("/update/:id", validarJWT, updateCommunity);
routerComunity.delete("/delete/:id", validarJWT, deleteCommunity);

export default routerComunity;
