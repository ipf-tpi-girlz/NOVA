import { Router } from "express";
import { getPostsComunity, createPostComunity, updatePostComunity, deletePostComunity } from "../controllers/post.comunity.controllers.js";
import { validarJWT } from "../healpers/validar.jwt.js";
const routerPostComunity = Router();

routerPostComunity.get("/:id", getPostsComunity);
routerPostComunity.post("/create/:id", validarJWT, createPostComunity);
routerPostComunity.put("/update/:id", validarJWT, updatePostComunity);
routerPostComunity.delete("/delete/:id", validarJWT, deletePostComunity);

export default routerPostComunity;
