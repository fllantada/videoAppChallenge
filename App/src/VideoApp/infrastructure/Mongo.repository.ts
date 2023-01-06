import { Model } from "mongoose";
import { Video } from "../domain/entities/video";
import { VideoRepository } from "../domain/video.repository";
import videoModel from "./models/video.schema";
import mongoose from "mongoose";

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
      .limit(limitQty)
      .lean();
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
      .limit(limitQty)
      .lean();

    return videos;
  }
  async getVideo(id: string): Promise<Video> {
    console.log("id del video es:", id);

    const video = await this.model.findById(id).lean();

    if (!video) throw new Error("Video not found");
    return video;
  }
  async editPopularity(id: string, newPopularity: number): Promise<Video> {
    console.log(id, newPopularity);
    const video = await this.model
      .findByIdAndUpdate(id, { popularity: newPopularity }, { new: true })
      .lean();

    if (!video) throw new Error("Video couldnt be edited ");

    return video;
  }
}
