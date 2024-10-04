import { Router } from "express";
import { createPost, getPost, updatePost, deletePost } from '../controllers/post.controllers.js'
import { validarJWT } from "../middlewares/jwt.validation.js";

export const postRouter = Router();

postRouter.post('/create/:id', validarJWT, createPost);
postRouter.get('/:id', getPost);
postRouter.put('/update/:id', validarJWT, updatePost);
postRouter.delete('/delete/:id', validarJWT, deletePost);
