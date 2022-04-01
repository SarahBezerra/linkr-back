import { Router } from "express";
import {
  getInitComments,
  getPostComments,
  postNewComment,
} from "../controllers/commentController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import commentSchema from "../schemas/commentSchema.js";

const commentRouter = Router();

commentRouter.get("/comments/:postId", getPostComments);
commentRouter.get("/comments", getInitComments);
commentRouter.post(
  "/comments/:postId",
  validateSchemaMiddleware(commentSchema),
  postNewComment
);

export default commentRouter;
