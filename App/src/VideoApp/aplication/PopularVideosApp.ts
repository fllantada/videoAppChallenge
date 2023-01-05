import { Video } from "../domain/entities/video";
import { VideoRepository } from "../domain/video.repository";

export default class PopularVideosApp {
  //Si bien puede verse muy redundante todo esto lo hago pensando en la consigna de
  //algo escalable

  //logica para no buscar videos si ya tengo los videos populares
  videos: Video[] = [];

  private popularVideos: Video[] = [];

  constructor(private videoRepository: VideoRepository) {}

  async getPopularVideos(): Promise<Video[]> {
    if (this.popularVideos.length > 0) {
      this.popularVideos = await this.videoRepository.getPopularVideos(5);
    }
    return this.popularVideos;
  }

  async getVideo(id: string): Promise<Video> {
    const video = await this.videoRepository.getVideo(id);
    return video;
  }

  async editLike(id: string, action: "like" | "dislike"): Promise<Video> {
    const video = await this.getVideo(id);
    let newPopularity = video.popularity;

    if (action === "dislike") {
      newPopularity = video.popularity - 1;
    }

    if (action === "like") {
      newPopularity = video.popularity + 1;
    }

    const editedVideo = await this.videoRepository.editPopularity(
      id,
      newPopularity
    );
    return editedVideo;
  }
}
