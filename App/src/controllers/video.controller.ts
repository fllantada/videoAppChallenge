import { MongoRepository } from "../VideoApp/infrastructure/Mongo.repository";
import { VideoRepository } from "../VideoApp/domain/video.repository";
import { PopularVideosApp } from "../VideoApp/aplication/PopularVideosApp";
import { Request, Response } from "express";
import mongoConnection from "../services/mongoConextion";

export class VideoController {
  private repository: VideoRepository;
  private app: PopularVideosApp;

  constructor() {
    mongoConnection().then(() => this.initialize());

    this.repository = new MongoRepository();
    // this.app = new PopularVideosApp(this.repository);
  }

  async getVideos(req: Request, res: Response): Promise<void> {
    res.send("hola");
  }
  async initialize(): Promise<void> {
    console.log("At controller Start initialize");
  }
}
