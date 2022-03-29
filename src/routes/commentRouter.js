import { Router } from "express";
import {
  getInitComments,
  postNewComment,
} from "../controllers/commentController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import { validateToken } from "../middlewares/validateToken.js";
import commentSchema from "../schemas/commentSchema.js";

const commentRouter = Router();

commentRouter.get("/comments", validateToken, getInitComments);
commentRouter.post(
  "/comments/:postId",
  validateToken,
  validateSchemaMiddleware(commentSchema),
  postNewComment
);

export default commentRouter;
