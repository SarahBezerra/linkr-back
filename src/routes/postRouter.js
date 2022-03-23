import { Router } from "express";
import { getPosts } from "../controllers/postController.js";


const postRouter = Router();



//validateTokenMiddleware

postRouter.get('/posts', getPosts);


export default postRouter;