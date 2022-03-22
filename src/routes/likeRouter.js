import { Router } from "express";

const likeRouter = Router();

likeRouter.get("/like/:idPost");
likeRouter.post("/like");
likeRouter.delete("/like/:idPost");

export default likeRouter;
