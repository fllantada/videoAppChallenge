import { Router } from "express";
import videoController from "../controllers/video.controller";

const videosRouter = Router();

videosRouter.get("/", videoController.getPopularVideos);

export default videosRouter;
