import { Router } from "express";
import { loginUser, registerUser, logout } from "../controllers/users.controllers.js";

const UserRouter = Router();

UserRouter.post("/login", loginUser);
UserRouter.post("/register", registerUser);
UserRouter.post("/logout", logout);

export default UserRouter;  