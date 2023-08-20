import express from "express";
import { validateBody } from "../../decorators/index.js";
import usersSchemas from "../../schemas/users-schemas.js";
import authController from "../../controllers/auth-controller.js";
import {authenticate, upload} from "../../middlewars/index.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(usersSchemas.userSignupSchema), authController.signup);

authRouter.post("/login", validateBody(usersSchemas.userSignupSchema), authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.signout);

// authRouter.patch('/', authenticate, validateBody(updateBySubscriptionSchema), updateBySubscription);
authRouter.patch('/avatars', authenticate, upload.single('avatars'), authController.updateByAvatar);




export default authRouter;
