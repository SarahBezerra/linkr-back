import { Router } from "express";
import likeRouter from "./likeRouter.js";

const router = Router();
router.use(likeRouter);

export default router;
