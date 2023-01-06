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
    console.log("GetTodayPopularVideos");
    const today = new Date(); //today
    const beginingOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    console.log(beginingOfToday);

    const findFilter = {
      created_date: { $gte: beginingOfToday },
    };

    const videos = await this.model
      .find(findFilter)
      .sort({ popularity: -1 })
      .limit(limitQty);
    return videos;
  }

  async getPopularVideos(
    limitQty: number,
    minPopularity: number
  ): Promise<Video[]> {
    const filter = {
      popularity: { $gte: minPopularity },
    };

    console.log(filter);

    const videos = await this.model
      .find(filter)
      .sort({ popularity: -1 })
      .limit(limitQty);

    return videos;
  }
}
