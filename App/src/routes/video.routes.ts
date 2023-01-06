import { Router } from "express";
import videoController from "../controllers/video.controller";

const videosRouter = Router();

videosRouter.get("/", videoController.getPopularVideos);

videosRouter.post("/like", videoController.likeEvent);

videosRouter.post("/comment", videoController.commentEvent);

export default videosRouter;
