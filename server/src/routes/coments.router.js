import { Router } from "express";
import { validarJWT } from "../middlewares/jwt.validation.js";
import { getComment, deleteComment, updateComment, createComment } from "../controllers/coments.js";

const routerComents = Router();

routerComents.get("/", validarJWT, getComment);
routerComents.delete("/delete/:id", validarJWT, deleteComment);
routerComents.put("/update/:id", validarJWT, updateComment);
routerComents.post("/:id", validarJWT, createComment);

export default routerComents;