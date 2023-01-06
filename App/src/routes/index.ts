import { Router } from "express";
import videoRouter from "./video.routes";
import authRouter from "./auth.routes";

import { Request, Response } from "express";

const mainRouter = Router();

//check protected Routes

/* mainRouter.use("/api", adminGuard); */

mainRouter.use("/api", (req: Request, res: Response, next) => {
  console.log(req.session);
  console.log("solicitur de api");
  console.log("req.body es:", req.body);
  next();
});

mainRouter.use("/api/videos", videoRouter);

/* mainRouter.use("/api/auth", (req, res, next) => {

  console.log("auth");
  next();


}); */
mainRouter.use("/api/auth", authRouter);

export default mainRouter;
