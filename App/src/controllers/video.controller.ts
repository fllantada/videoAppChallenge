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
    try {
      const videos = videoApp.getPopularVideos();
      console.log("Videos from getPopularVideos Controller");
      console.log(videos);
      res.status(200).json(videos);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },

  likeEvent: async (req: Request, res: Response) => {
    const videoId: string = req.body.videoId;
    const likeAction = req.body.likeAction;

    if (!videoId || (likeAction !== "like" && likeAction !== "dislike")) {
      return res.status(400).json({ error: "Missing or invalid parameters" });
    }

    try {
      videoApp.likeEvent(videoId, likeAction);
      res.status(200).json("ok");
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  commentEvent: async (req: Request, res: Response) => {
    const videoId: string = req.body.videoId;
    const commentAction = req.body.comment;

    if (!videoId || (commentAction !== "add" && commentAction !== "remove")) {
      return res.status(400).json({ error: "Missing or invalid parameters" });
    }

    try {
      videoApp.commentEvent(videoId, commentAction);
      res.status(200).json("ok");
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
};
