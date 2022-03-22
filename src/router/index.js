import { Router } from "express";
import likeRouter from "./likeRouter";

const router = Router();
router.use(likeRouter);

export default router;
