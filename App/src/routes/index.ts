import { Router } from "express";
import viewsRouter from "./views.routes";

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

mainRouter.use("/", viewsRouter);

export default mainRouter;
