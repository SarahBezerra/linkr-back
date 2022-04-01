import { Router } from "express";
import { getPosts } from "../controllers/postController.js";
import filterPostMiddleware from "../middlewares/filterPostsMiddleware.js";
import { getTopHashtags } from "../controllers/hashtagController.js";

const hashtagRouter = Router();

hashtagRouter.get("/hashtag/:hashtag", filterPostMiddleware, getPosts);
hashtagRouter.get("/topHashtags", getTopHashtags);

export default hashtagRouter;
