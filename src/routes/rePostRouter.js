import { Router } from "express";
import { getRePosts, /*likePostOrNot*/ } from "../controllers/likeController.js";
import { validateToken } from "../middlewares/validateToken.js";

const rePostRouter = Router();

rePostRouter.get("/rePost", validateToken, getRePosts);
//rePostRouter.post("/rePost/:idPost", validateToken, likePostOrNot);

export default rePostRouter;
