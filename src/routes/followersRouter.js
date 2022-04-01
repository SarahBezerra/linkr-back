import { Router } from "express";
import {
  deleteFollow,
  getFollowers,
  postFollow,
} from "../controllers/followersController.js";

const followersRouter = Router();

followersRouter.get("/follows/:pageUserId", getFollowers);
followersRouter.post("/follows", postFollow);
followersRouter.delete("/follows/:pageUserId", deleteFollow);

export default followersRouter;
