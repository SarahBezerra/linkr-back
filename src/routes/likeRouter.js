import { Router } from "express";
import { getLikes, likePostOrNot } from "../controllers/likeController.js";
import { validateToken } from "../middlewares/validateToken.js";

const likeRouter = Router();

likeRouter.get("/like", validateToken, getLikes);
likeRouter.post("/like/:idPost", validateToken, likePostOrNot);

export default likeRouter;
