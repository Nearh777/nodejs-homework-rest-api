import express from "express";
import { validateBody } from "../../decorators/index.js";
import usersSchemas from "../../schemas/users-schemas.js";
import authController from "../../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/signup", validateBody(usersSchemas.userSignupSchema), authController.signup);




export default authRouter;
