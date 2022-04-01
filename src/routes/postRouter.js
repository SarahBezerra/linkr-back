import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import { validateToken } from "../middlewares/validateToken.js";
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

postRouter.post(
  "/posts",
  validateToken,
  validateSchemaMiddleware(postSchema),
  sendPost
);
postRouter.get("/posts", validateToken, filterPostMiddleware, getPosts);
postRouter.get("/posts/:id", validateToken, filterPostMiddleware, getPosts);
postRouter.delete("/posts/:idPost", validateToken, deletePost);
postRouter.put("/posts/:postId", validateToken, updatePost);
postRouter.post("/newposts/:idPost", validateToken, getPostsWithInterval);

export default postRouter;
