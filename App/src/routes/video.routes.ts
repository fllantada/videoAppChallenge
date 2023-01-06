import { Router } from "express";
import videoController from "../controllers/video.controller";

const videosRouter = Router();

videosRouter.get("/", videoController.getPopularVideos);

videosRouter.post("/event", videoController.eventHandler);

export default videosRouter;
