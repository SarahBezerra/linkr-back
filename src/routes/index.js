import { Router } from "express";
import postRouter from "./postRouter.js";
import authRouter from "./authRoute.js";
import likeRouter from "./likeRouter.js";
import hashtagRouter from "./hashtagRoute.js";
import browserRouter from "./browserRouter.js";
import followersRouter from "./followersRouter.js";
import commentRouter from "./commentRouter.js";
import rePostRouter from "./rePostRouter.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router();

router.use(browserRouter);
router.use(authRouter);
router.use(validateToken, postRouter);
router.use(validateToken, likeRouter);
router.use(validateToken, hashtagRouter);
router.use(validateToken, followersRouter);
router.use(validateToken, commentRouter);
router.use(validateToken, rePostRouter);

export default router;
