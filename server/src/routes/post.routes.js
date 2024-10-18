import { Router } from "express";
import { getPostUser, getPosts, createPost, updatePost, deletePost } from "../controllers/post.controllers.js";

export const postRouter = Router();

foroRouter.get("/", getPosts);
foroRouter.get("/user", validarJWT, getPostUser);
foroRouter.post("/create", validarJWT, createPost);
foroRouter.put("/update/:id", validarJWT, updatePost);
foroRouter.delete("/delete/:id", validarJWT, deletePost);

export default postRouter;