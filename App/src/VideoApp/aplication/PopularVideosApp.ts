import { Video } from "../domain/entities/video";
import { VideoRepository } from "../domain/video.repository";

export default class PopularVideosApp {
  constructor(private videoRepository: VideoRepository) {}

  async getPopularVideos(): Promise<Video[]> {
    const videos = await this.videoRepository.getPopularVideos(5);
    return videos;
  }

  async getVideo(id: string): Promise<Video> {
    const video = await this.videoRepository.getVideo(id);
    return video;
  }

  async addLike(id: string, popularity: number): Promise<Video> {
    const video = await this.videoRepository.addLike(id, popularity);
    return video;
  }
}
