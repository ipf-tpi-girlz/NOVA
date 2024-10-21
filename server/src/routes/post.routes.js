import { Router } from "express";
import {
  getPostUser,
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post.controllers.js";
import { validarJWT } from "../middlewares/jwt.validation.js";

export const postRouter = Router();

postRouter.get("/infoGeneral", getPosts);
postRouter.get("/user", validarJWT, getPostUser);
postRouter.post("/create", validarJWT, createPost);
postRouter.put("/update/:id", validarJWT, updatePost);
postRouter.delete("/delete/:id", validarJWT, deletePost);

export default postRouter;
