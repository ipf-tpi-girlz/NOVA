import { Router } from "express";
import { getArticleId, getArticles, createArticle, editArticle, deleteArticle, getUserArticle, getArticlesByUser } from "../controllers/post.article.js";
import { validarJWT } from "../middlewares/jwt.validation.js"
import { upload } from "../middlewares/img.middleware.js"

const articleRouter = Router();

articleRouter.get("/", getArticles);
articleRouter.get("/:id", getArticleId);
articleRouter.get("/user", validarJWT, getUserArticle);
articleRouter.post("/create", upload.single("img"), validarJWT, createArticle);
articleRouter.put("/update/:id", upload.single("img"), validarJWT, editArticle);
articleRouter.delete("/delete/:id", validarJWT, deleteArticle);
articleRouter.get("/profesional/articulos/:usuarioId", validarJWT, getArticlesByUser);


export default articleRouter