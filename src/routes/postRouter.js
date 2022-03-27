import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import postSchema from "../schemas/postSchema.js";
import {
  getPosts,
  sendPost,
  deletePost,
} from "../controllers/postController.js";
import filterPostMiddleware from "../middlewares/filterPostsMiddleware.js";
import { validateToken } from "../middlewares/validateToken.js";

const postRouter = Router();

postRouter.post(
  "/posts",
  validateToken,
  validateSchemaMiddleware(postSchema),
  sendPost
);
postRouter.get("/posts", filterPostMiddleware, getPosts);
postRouter.delete("/posts/:idPost", validateToken, deletePost);

export default postRouter;
