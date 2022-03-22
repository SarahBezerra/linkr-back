import { Router } from "express";
import { getLikes, likePostOrNot } from "../controllers/likeController.js";
import validateSchemaMiddleware from "../middlewares/valideSchemaMiddleware.js";
import likeSchema from "../schemas/likeSchema.js";

const likeRouter = Router();

likeRouter.get("/like/:idPost", getLikes);
likeRouter.post(
  "/like/:idPost",
  validateSchemaMiddleware(likeSchema),
  likePostOrNot
);

export default likeRouter;
