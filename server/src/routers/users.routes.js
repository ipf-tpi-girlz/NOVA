import { Router } from "express";
import {
  registerUser,
  loginUser,
  logout,
} from "../controllers/users.controllers.js";
import { loginSchema, registerUserSchema } from "../schemas/users.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

export const usersRouter = Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);
usersRouter.post("/logout", logout);
