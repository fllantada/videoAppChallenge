import { Router } from "express";
import authController from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/", (req, res, next) => {
  console.log("hola");
  res.send("hola");
});

authRouter.post("/login", authController.login);
authRouter.post("/signup", authController.signup);

export default authRouter;
