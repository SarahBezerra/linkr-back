import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import postSchema from "../schemas/postSchema.js";
import {
  getPosts,
  sendPost,
  deletePost,
  updatePost,
  getPostsWithInterval,
} from "../controllers/postController.js";
import filterPostMiddleware from "../middlewares/filterPostsMiddleware.js";

const postRouter = Router();

postRouter.post("/posts", validateSchemaMiddleware(postSchema), sendPost);
postRouter.get("/posts", filterPostMiddleware, getPosts);
postRouter.get("/posts/:id", filterPostMiddleware, getPosts);
postRouter.delete("/posts/:idPost", deletePost);
postRouter.put("/posts/:postId", updatePost);
postRouter.post("/newposts/:idPost", getPostsWithInterval);

export default postRouter;
