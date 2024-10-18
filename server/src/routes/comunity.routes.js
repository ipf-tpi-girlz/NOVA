import { Router } from "express";
import { getComunities, getCommunityID, updateComunity, deleteComunity } from "../controllers/comunity.controllers.js";
import upload from "../middlewares/img.middleware.js";

const routerComunity = Router();

routerComunity.get("/", getComunities);
routerComunity.post("/create", upload.single("img_perfil"), createComunity);
routerComunity.put("/update/:id", upload.single("img_perfil", "img_portada"), updateComunity);
routerComunity.delete("/delete/:id", deleteComunity);

export default routerComunity;
