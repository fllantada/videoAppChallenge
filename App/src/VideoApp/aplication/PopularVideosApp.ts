import { Video } from "../domain/entities/video";
import { VideoRepository } from "../domain/video.repository";

export default class PopularVideosApp {
  //Si bien puede verse muy redundante todo esto lo hago pensando en la consigna de
  //algo escalable

  //logica para no buscar videos si ya tengo los videos populares

  private popularVideos: Video[] = [];

  constructor(private videoRepository: VideoRepository) {
    this.updatePopularVideos();
  }

  async updatePopularVideos(): Promise<void> {
    this.popularVideos = await this.videoRepository.getPopularVideos(5);
  }

  async getVideo(id: string): Promise<Video> {
    //first try local
    const video = this.popularVideos.find((video) => video._id === id);
    if (video) return video;

    //go find to DB
    return await this.videoRepository.getVideo(id);
  }

  async editLike(id: string, action: "like" | "dislike"): Promise<Video> {
    const video = await this.getVideo(id);
    let newPopularity = video.popularity;

    if (action === "dislike") newPopularity = video.popularity - 5;

    if (action === "like") newPopularity = video.popularity + 10;

    const editedVideo = await this.videoRepository.editPopularity(
      id,
      newPopularity
    );
    this.updatePopularVideos();
    return editedVideo;
  }
}
