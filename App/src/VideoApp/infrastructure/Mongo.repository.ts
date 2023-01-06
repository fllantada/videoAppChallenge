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
    const today = new Date(); //today
    const beginingOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const queryFilter = {
      created_date: { $gte: beginingOfToday },
    };

    const videos = await this.model
      .find(queryFilter)
      .sort({ popularity: -1 })
      .limit(limitQty);
    return videos;
  }

  async getPopularVideos(
    limitQty: number,
    minPopularity: number
  ): Promise<Video[]> {
    const queryFilter = {
      popularity: { $gte: minPopularity },
    };

    const videos = await this.model
      .find(queryFilter)
      .sort({ popularity: -1 })
      .limit(limitQty);

    return videos;
  }
}
