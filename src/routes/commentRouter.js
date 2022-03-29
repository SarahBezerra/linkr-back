import { Router } from "express";
import { getInitComments } from "../controllers/commentController.js";
import { validateToken } from "../middlewares/validateToken.js";

const commentRouter = Router();

commentRouter.get("/comments", validateToken, getInitComments);

export default commentRouter;
