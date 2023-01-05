import { Router } from "express";
import { VideoController } from "../controllers/video.controller";

const videoController = new VideoController();

const videosRouter = Router();

videosRouter.get("/", videoController.getVideos);

export default videosRouter;
