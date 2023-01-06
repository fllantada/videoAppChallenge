import { Router } from "express";
import { checkAuthToken } from "../Auth/services/jwt";
import videoController from "../controllers/video.controller";

const videosRouter = Router();

videosRouter.get("/", videoController.getPopularVideos);

videosRouter.post("/event", checkAuthToken, videoController.eventHandler);

videosRouter.get("/:id", videoController.getVideoById);

export default videosRouter;
