import { Model } from "mongoose";
import { Video } from "../domain/entities/video";
import { VideoRepository } from "../domain/video.repository";
import videoModel from "./models/video.schema";

export class MongoRepository implements VideoRepository {
  private model: Model<Video>;

  constructor() {
    this.model = videoModel;
    this.model.find({}).then((result) => console.log(result));
  }

  editPopularity(id: string, newPopularity: number): Promise<Video> {
    throw new Error("Method not implemented.");
  }
  addComment(videoId: string, text: string): Promise<Comment> {
    throw new Error("Method not implemented.");
  }
  async getPopularVideos(qty: number): Promise<Video[]> {
    const videos = await this.model.find({});

    console.log(videos);
    return videos;
  }
  getVideo(id: string): Promise<Video> {
    throw new Error("Method not implemented.");
  }
  addLike(id: string, popularity: number): Promise<Video> {
    throw new Error("Method not implemented.");
  }
  getComments(videoId: string): Promise<Comment[]> {
    throw new Error("Method not implemented.");
  }

  addComent(videoId: string, text: string): Promise<Comment> {
    throw new Error("Method not implemented.");
  }
}
