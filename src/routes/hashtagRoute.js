import { Router } from "express";
import { getPosts } from "../controllers/postController.js";
import filterPostMiddleware from "../middlewares/filterPostsMiddleware.js";
import { validateToken } from "../middlewares/validateToken.js";
import { getTopHashtags } from "../controllers/hashtagController.js"


const hashtagRouter = Router();


hashtagRouter.use(validateToken);
hashtagRouter.get('/hashtag/:hashtag', filterPostMiddleware, getPosts);
hashtagRouter.get('/topHashtags', getTopHashtags);


export default hashtagRouter