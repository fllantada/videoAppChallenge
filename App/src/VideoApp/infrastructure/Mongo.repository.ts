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

    const viewsFilter = {
      views: { $gte: 1 },
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
    const videos = await this.model
      .find({ popularity: { $gte: minPopularity } })
      .sort({ popularity: -1 })
      .limit(limitQty);

    console.log("videos desde  mongo repository", videos);
    return videos;
  }
}
