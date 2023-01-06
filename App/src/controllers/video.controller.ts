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

  getVideoById: async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
      const video = await videoApp.getVideo(id);

      res.status(200).json(video);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  eventHandler: async (req: Request, res: Response) => {
    // can be improved with DTO and validation with JOI

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
      let video;
      if (action === "addLike" || action === "removeLike") {
        video = await videoApp.likeEvent(videoId, action);
        res.status(200).json({ msg: "Event registered ok", videoNow: video });
      }

      if (action === "addComment" || action === "removeComment") {
        video = await videoApp.commentEvent(videoId, action);
        res.status(200).json({ msg: "Event registered ok", videoNow: video });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
};
