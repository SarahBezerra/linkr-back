import { Router } from "express";
import { postSingUp } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post('/sign-up', postSingUp);

export default authRouter;