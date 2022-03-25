import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import postSchema from "../schemas/postSchema.js";
import {
  deletePost,
  getPosts,
  sendPost,
} from "../controllers/postController.js";

const postRouter = Router();

postRouter.post("/posts", validateSchemaMiddleware(postSchema), sendPost);
postRouter.get("/posts", getPosts);
postRouter.delete("/posts/:idPost", deletePost);

export default postRouter;
