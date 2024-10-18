import { Router } from "express";
import { getPosts, getPostUser, createPost, updatePost, deletePost } from "../controllers/post.controllers.js";

export const postRouter = Router();


//!trae foros y sub foros
foroRouter.get("/", getPosts);
//!trae posts del usuario
foroRouter.get("/user", validarJWT, getPostUser);
//!crea foros
foroRouter.post("/create", createPost);
//!edita foros
foroRouter.put("/update/:id", updatePost);
//!elimina foros
foroRouter.delete("/delete/:id", deletePost);