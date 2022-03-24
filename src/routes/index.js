import { Router } from "express";
import postRouter from "./postRouter.js";
import likeRouter from "./likeRouter.js";


const router = Router();
router.use(postRouter);
router.use(likeRouter);

export default router;
