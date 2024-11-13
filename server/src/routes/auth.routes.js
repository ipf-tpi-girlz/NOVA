import { Router } from "express";
import { upload } from "../middlewares/img.middleware.js";
import { getUserById, deleteAccount, updateUser, updatePassword, getUserProf, getUsers } from "../controllers/auth.controllers.js";
import { validarJWT } from "../middlewares/jwt.validation.js";

const authRoutes = Router();

authRoutes.post("/update", validarJWT, upload.single("img"), updateUser);
authRoutes.get("/profesionales", getUsers);
authRoutes.get("/profile/:id", getUserProf);
authRoutes.post("/change-password", validarJWT, updatePassword);
authRoutes.get("/user", validarJWT, getUserById);
authRoutes.delete("/delete", validarJWT, deleteAccount);
export default authRoutes;
