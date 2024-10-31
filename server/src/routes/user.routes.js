import { Router } from "express";
import { loginUser, registerUser, logout, getSession } from "../controllers/users.controllers.js";
import { validarJWT } from "../middlewares/jwt.validation.js";

const UserRouter = Router();

UserRouter.post("/login", loginUser);
UserRouter.post("/register", registerUser);
UserRouter.post("/logout", logout);
UserRouter.get("/session", validarJWT, getSession)

export default UserRouter;  