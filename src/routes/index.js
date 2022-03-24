import { Router } from "express";
import likeRouter from "./likeRouter.js";
import postRouter from "./postRouter.js";

const router = Router();
router.use(likeRouter);
router.use(postRouter);

export default router;
