import { Router } from "express";
import postRouter from "./postRouter.js";
import likeRouter from "./likeRouter.js";
import authRouter from "./authRoute.js";


const router = Router();
router.use(postRouter);
router.use(likeRouter);
router.use(authRouter);

export default router;
