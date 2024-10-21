import { Router } from "express";
import { getUserById, deleteAccount } from "../controllers/auth.controllers.js";
import { validarJWT } from "../middlewares/jwt.validation.js";
const authRoutes = Router();

authRoutes.get("/user", validarJWT, getUserById);
authRoutes.delete("/delete", validarJWT, deleteAccount);
export default authRoutes;
