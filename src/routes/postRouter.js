import { Router } from "express";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import { validateToken } from "../middlewares/validateToken.js";
import postSchema from "../schemas/postSchema.js";
import { getPosts, sendPost } from "../controllers/postController.js";



const postRouter = Router();


postRouter.post('/posts', validateSchemaMiddleware(postSchema), validateToken, sendPost)
postRouter.get('/posts', getPosts);


export default postRouter;