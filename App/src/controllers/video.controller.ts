import { MongoRepository } from "../VideoApp/infrastructure/Mongo.repository";
import { VideoRepository } from "../VideoApp/domain/video.repository";
import { PopularVideosApp } from "../VideoApp/aplication/PopularVideosApp";
import { Request, Response } from "express";

export class VideoController {
  private repository: VideoRepository;
  private app: PopularVideosApp;

  constructor() {
    console.log("Inicie cnstructor video controller");
    this.repository = new MongoRepository();
    this.app = new PopularVideosApp(this.repository);
  }

  async getVideos(req: Request, res: Response): Promise<void> {
    res.send("hola");
  }
}
