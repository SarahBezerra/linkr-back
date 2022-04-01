import { Router } from "express";
import { getRePosts, toggleRePost } from "../controllers/rePostController.js";
import { validateToken } from "../middlewares/validateToken.js";

const rePostRouter = Router();

rePostRouter.get("/rePost", getRePosts);
rePostRouter.post("/rePost/:idPost", toggleRePost);

export default rePostRouter;
