import { Router } from "express";
import { postSingUp } from "../controllers/authController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import signUpSchema from "../schemas/signUpSchema.js";

const authRouter = Router();

authRouter.post('/sign-up', validateSchemaMiddleware(signUpSchema), postSingUp);

export default authRouter;