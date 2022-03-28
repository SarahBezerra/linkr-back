import { Router } from "express";
import { getUsers } from "../controllers/browserController.js";


const browserRouter = Router();



browserRouter.get('/users_filter', getUsers);




export default browserRouter;