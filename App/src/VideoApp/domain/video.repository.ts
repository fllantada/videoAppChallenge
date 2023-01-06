import { Video } from "./entities/video";

export interface VideoRepository {
  getTodayPopularVideos(limitQty: number): Promise<Video[]>; //get todays most popular videos
  getPopularVideos(limitQty: number, minPopularity: number): Promise<Video[]>; //get all videos by popularity

  //change video popularity
}
