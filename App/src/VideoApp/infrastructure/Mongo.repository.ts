import { Model } from "mongoose";
import { Video } from "../domain/entities/video";
import { VideoRepository } from "../domain/video.repository";
import videoModel from "./models/video.schema";

export class MongoRepository implements VideoRepository {
  private model: Model<Video>;

  constructor() {
    this.model = videoModel;
  }

  async getTodayPopularVideos(limitQty: number): Promise<Video[]> {
    const videos = await this.model
      .find({ date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } })
      .sort({ popularity: -1 })
      .limit(limitQty);
    return videos;
  }

  async getPopularVideos(
    limitQty: number,
    minPopularity: number
  ): Promise<Video[]> {
    const videos = await this.model
      .find({ popularity: { $gte: minPopularity } })
      .sort({ popularity: -1 })
      .limit(limitQty);
    return videos;
  }
}
