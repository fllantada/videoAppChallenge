import { Router } from "express";
import videoRouter from "./video.routes";
import authRouter from "./auth.routes";

import { Request, Response } from "express";

const mainRouter = Router();

mainRouter.use("/api", (req: Request, res: Response, next) => {
  next();
});

mainRouter.use("/api/videos", videoRouter);

mainRouter.use("/api/auth", authRouter);

export default mainRouter;
