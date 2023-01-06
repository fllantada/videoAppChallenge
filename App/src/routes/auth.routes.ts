import { Router } from "express";
import authController from "../controllers/auth.controller";

const userRouter = Router();

userRouter.post("/login", authController.login);

export default userRouter;
