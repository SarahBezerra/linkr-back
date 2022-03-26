import { Router } from "express";
import { getPosts } from "../controllers/postController.js";
import filterPostMiddleware from "../middlewares/filterPostsMiddleware.js";


const hashtagRouter = Router();

hashtagRouter.get('/hashtag/:hashtag', filterPostMiddleware, getPosts);


export default hashtagRouter