import { Router } from "express";
import { protectedRoutes } from "../Auth/middlewares/protected";

import videoController from "../controllers/video.controller";

const videosRouter = Router();

videosRouter.get("/", videoController.getPopularVideos);

videosRouter.post("/event", protectedRoutes, videoController.eventHandler);

videosRouter.get("/:id", videoController.getVideoById);

export default videosRouter;
