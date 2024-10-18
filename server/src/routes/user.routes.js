import { Router } from "express";
import { loginUser, registerUser, logout } from "../controllers/users.controllers.js";

const UserRouter = Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logout);

export default UserRouter;  