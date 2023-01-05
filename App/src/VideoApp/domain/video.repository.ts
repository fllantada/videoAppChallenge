import { Video } from "./entities/video";

export interface VideoRepository {
  getPopularVideos(qty: number): Promise<Video[]>; //get all videos
  getVideo(id: string): Promise<Video>; //get video by id
  editPopularity(id: string, newPopularity: number): Promise<Video>;
  getComments(videoId: string): Promise<Comment[]>;
  addComment(videoId: string, text: string): Promise<Comment>;
  //change video popularity
}
