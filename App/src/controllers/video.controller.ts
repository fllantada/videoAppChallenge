import { MongoRepository } from "../VideoApp/infrastructure/Mongo.repository";
import { VideoRepository } from "../VideoApp/domain/video.repository";
import { PopularVideosApp } from "../VideoApp/aplication/PopularVideosApp";
import { Request, Response } from "express";
import mongoConnection from "../services/mongoConextion";

export class VideoController {
  private repository: VideoRepository;
  private app: PopularVideosApp;

  constructor() {
    this.repository = new MongoRepository();
    this.app = new PopularVideosApp(this.repository);
  }

  async getVideos(req: Request, res: Response): Promise<void> {
    console.log(this);
    //await this.app.updatePopularVideos();
    res.send("hola");
  }
}
