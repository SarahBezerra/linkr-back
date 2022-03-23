import { Router } from "express";
<<<<<<< HEAD
import postRouter from "./postRouter.js";



const router = Router();
router.use(postRouter);


export default router;
=======
import likeRouter from "./likeRouter.js";

const router = Router();
router.use(likeRouter);

export default router;
>>>>>>> 7eeca73fa6f6bc57d94be48fcaf48b5c59609bd6
