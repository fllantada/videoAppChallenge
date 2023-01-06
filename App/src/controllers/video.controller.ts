import { MongoRepository } from "../VideoApp/infrastructure/Mongo.repository";
import { VideoRepository } from "../VideoApp/domain/video.repository";
import { PopularVideosApp } from "src/VideoApp/aplication/PopularVideosApp";
import { Request, Response } from "express";
import videoApp from "../index";

export default {
  healthCheck: async (req: Request, res: Response) => {
    console.log("GetVideos");
    const test = videoApp.testMethod();

    res.json(test);
  },

  getPopularVideos: async (req: Request, res: Response) => {
    const videos = videoApp.getPopularVideos();

    console.log("Videos from getPopularVideos Controller");
    console.log(videos);
    res.json(videos);
  },
};
