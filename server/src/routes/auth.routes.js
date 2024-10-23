import { Router } from "express";
import { getUserById, deleteAccount, updateUser } from "../controllers/auth.controllers.js";
import { validarJWT } from "../middlewares/jwt.validation.js";
const authRoutes = Router();

authRoutes.post("/update", validarJWT, updateUser);
authRoutes.get("/user", validarJWT, getUserById);
authRoutes.delete("/delete", validarJWT, deleteAccount);
export default authRoutes;
