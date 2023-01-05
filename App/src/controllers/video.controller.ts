import { MongoRepository } from "../VideoApp/infrastructure/Mongo.repository";
import { VideoRepository } from "../VideoApp/domain/video.repository";
import { Request, Response } from "express";

export class VideoController {
  private repository: VideoRepository;

  constructor() {
    console.log("Inicie cnstructor video controller");
    this.repository = new MongoRepository();
  }

  async getVideos(req: Request, res: Response): Promise<void> {
    res.send("hola");
  }
}
