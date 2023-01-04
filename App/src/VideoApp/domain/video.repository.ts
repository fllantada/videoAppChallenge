import { Video } from "./entities/video";

export interface VideoRepository {
  getPopularVideos(qty: number): Promise<Video[]>; //get all videos
  getVideo(id: string): Promise<Video>; //get video by id
  addLike(id: string, popularity: number): Promise<Video>;
  getComments(videoId: string): Promise<Comment[]>;
  addComent(videoId: string, text: string): Promise<Comment>;
  //change video popularity
}
