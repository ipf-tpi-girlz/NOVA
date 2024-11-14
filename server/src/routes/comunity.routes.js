import { Router } from "express";
import {
  getCommunity,
  getCommunityID,
  createCommunity,
  updateCommunity,
  deleteCommunity,
} from "../controllers/community.controllers.js";
import { upload } from "../middlewares/img.middleware.js";
import { validarJWT } from "../middlewares/jwt.validation.js";

const routerComunity = Router();

routerComunity.get("/", getCommunity);
routerComunity.get("/user", validarJWT, getCommunityID);
routerComunity.post("/create", validarJWT, upload.single("img"), createCommunity);
routerComunity.put("/update/:id", validarJWT, updateCommunity);
routerComunity.delete("/delete/:id", validarJWT, deleteCommunity);

export default routerComunity;
