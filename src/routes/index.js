import { Router } from "express";
import postRouter from "./postRouter.js";
import { validateToken } from "../middlewares/validateToken.js";
import likeRouter from "./likeRouter.js";
import authRouter from "./authRoute.js";
import hashtagRouter from "./hashtagRoute.js";

const router = Router();

router.use(authRouter);
router.use(likeRouter);
router.use(postRouter);
router.use(hashtagRouter);
router.use(likeRouter);

export default router;
