import { Video } from "../domain/entities/video";
import { VideoRepository } from "../domain/video.repository";

export class MongoRepository implements VideoRepository {
  getPopularVideos(qty: number): Promise<Video[]> {
    throw new Error("Method not implemented.");
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
