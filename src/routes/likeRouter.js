import { Router } from "express";
import { getLikes, likePostOrNot } from "../controllers/likeController.js";

const likeRouter = Router();

likeRouter.get("/like", getLikes);
likeRouter.post("/like/:idPost", likePostOrNot);

export default likeRouter;
