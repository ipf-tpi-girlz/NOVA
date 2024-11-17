import { Router } from "express"
import { getUsersJoin, joinCommunity, deleteJoin, userCommunity } from "../controllers/join.community.controllers.js"
import { validarJWT } from "../middlewares/jwt.validation.js";

const routerJoinC = Router();

routerJoinC.get("/:id", getUsersJoin)
routerJoinC.get("/user", validarJWT, userCommunity)
routerJoinC.post("/join/:id", validarJWT, joinCommunity)
routerJoinC.delete("/delete/:id", validarJWT, deleteJoin)

export default routerJoinC