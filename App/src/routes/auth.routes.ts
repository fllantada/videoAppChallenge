import { Router } from "express";
import authController from "../controllers/auth.controller";

import { passportLogin, passportSignup } from "../Auth/passport/passport";

const authRouter = Router();

authRouter.post("/login/passport", passportLogin);
authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
authRouter.post("/signup/passport", passportSignup);

export default authRouter;
