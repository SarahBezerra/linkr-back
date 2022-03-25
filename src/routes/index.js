import { Router } from "express";
import postRouter from "./postRouter.js";
import { validateToken } from "../middlewares/validateToken.js";
import likeRouter from "./likeRouter.js";
import authRouter from "./authRoute.js";

const router = Router();
router.use(postRouter);
router.use(validateToken, likeRouter);
router.use(authRouter);

export default router;
