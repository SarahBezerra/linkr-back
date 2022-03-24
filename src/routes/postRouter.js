import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/valideSchemaMiddleware.js";
import postSchema from "../schemas/postSchema.js";

const postRouter = Router();

postRouter.post('/posts', validateSchemaMiddleware(postSchema))

export default postRouter;