import { Video } from "./entities/video";

export interface VideoRepository {
  getTodayPopularVideos(limitQty: number): Promise<Video[]>; //get today popular videos
  getPopularVideos(limitQty: number, minPopularitu: number): Promise<Video[]>; //get all videos
  getVideo(id: string): Promise<Video>; //get video by id
  editPopularity(id: string, newPopularity: number): Promise<Video>;

  //change video popularity
}
