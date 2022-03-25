import { Router } from "express";
import { postSingIn, postSingUp } from "../controllers/authController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import signInSchema from "../schemas/signInSchema.js";
import signUpSchema from "../schemas/signUpSchema.js";

const authRouter = Router();

authRouter.post('/sign-up', validateSchemaMiddleware(signUpSchema), postSingUp);
authRouter.post('/sign-in', validateSchemaMiddleware(signInSchema), postSingIn);

export default authRouter;