import { Router } from "express"
import { getUsersJoin, joinCommunity, deleteJoin, getCommunitiesForUser } from "../controllers/join.community.controllers.js"
import { validarJWT } from "../middlewares/jwt.validation.js";

const routerJoinC = Router();

routerJoinC.get("/:id", getUsersJoin)
routerJoinC.post("/join/:id", validarJWT, joinCommunity)
routerJoinC.delete("/delete/:id", validarJWT, deleteJoin)
routerJoinC.get("/user/communities", validarJWT, getCommunitiesForUser);

export default routerJoinC