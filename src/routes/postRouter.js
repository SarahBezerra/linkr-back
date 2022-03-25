import { Router } from "express";
import { deletePost, getPosts } from "../controllers/postController.js";

const postRouter = Router();

//validateTokenMiddleware

postRouter.get("/posts", getPosts);
postRouter.delete("/posts/:id", deletePost);

export default postRouter;
