import { Request, Response } from "express";
import videoApp from "../index";

export default {
  healthCheck: async (req: Request, res: Response) => {
    console.log("GetVideos");
    try {
      const test = videoApp.testMethod();
      res.status(200).json(test);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  getPopularVideos: async (req: Request, res: Response) => {
    //public route
    try {
      const videos = videoApp.getPopularVideos();
      console.log("Videos from getPopularVideos Controller");
      console.log(videos);
      res.status(200).json(videos);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  eventHandler: async (req: Request, res: Response) => {
    //protected route
    const videoId: string = req.body.videoId;
    const action = req.body.action;

    const validActions = [
      "addLike",
      "removeLike",
      "addComment",
      "removeComment",
    ];

    if (!videoId || !validActions.includes(action)) {
      return res.status(400).json({ error: "Missing or invalid parameters" });
    }

    try {
      if (action === "addLike" || action === "removeLike") {
        videoApp.likeEvent(videoId, action);
        res.status(200).json("ok");
      }

      if (action === "addComment" || action === "removeComment") {
        videoApp.commentEvent(videoId, action);
        res.status(200).json("ok");
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
};
