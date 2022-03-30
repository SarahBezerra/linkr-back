import { Router } from "express";
import { deleteFollow, getFollowers, postFollow } from "../controllers/followersController.js";
import { validateToken } from "../middlewares/validateToken.js";

const followersRouter = Router();

followersRouter.get('/follows/:pageUserId', validateToken, getFollowers);
followersRouter.post('/follows', validateToken, postFollow);
followersRouter.delete('/follows/:pageUserId', validateToken, deleteFollow);

export default followersRouter;