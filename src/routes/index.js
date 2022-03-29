import { Router } from "express";
import postRouter from "./postRouter.js";
import authRouter from "./authRoute.js";
import likeRouter from "./likeRouter.js";
import hashtagRouter from "./hashtagRoute.js";
import browserRouter from "./browserRouter.js";
import commentRouter from "./commentRouter.js";

const router = Router();

router.use(browserRouter);
router.use(authRouter);
router.use(postRouter);
router.use(likeRouter);
router.use(hashtagRouter);
router.use(commentRouter);

export default router;
