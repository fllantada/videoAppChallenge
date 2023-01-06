import { Video } from "../domain/entities/video";
import { VideoRepository } from "../domain/video.repository";

export class PopularVideosApp {
  //Si bien puede verse muy redundante todo esto lo hago pensando en la consigna de
  //algo escalable

  private popularVideos: Video[] = [];
  private notTodayPopularVideos: Video[] = [];
  private todayPopularVideos: Video[] = [];
  private today: Date;
  private minPopularity: number = 0;

  constructor(private videoRepository: VideoRepository) {
    this.today = new Date();
    this.updatePopularVideos();
  }

  async updatePopularVideos(): Promise<void> {
    await this.getTodayPopular();
    await this.getAllTimePopular();
    await this.mergeVideos();
    await this.sortVideos();
  }

  private async getTodayPopular(): Promise<void> {
    const videosToday = await this.videoRepository.getTodayPopularVideos(10);

    if (!videosToday.length) {
      this.todayPopularVideos = [];
      this.minPopularity = 0;
      return;
    }
    this.todayPopularVideos = videosToday.map((video: Video) => {
      return { ...video, popularityAdjusted: video.popularity + 100 };
    });
    this.minPopularity =
      videosToday[Math.min(videosToday.length - 1, 4)].popularity + 100;
  }

  private async getAllTimePopular(): Promise<void> {
    const videosAllTime = await this.videoRepository.getPopularVideos(
      10,
      this.minPopularity
    );

    this.notTodayPopularVideos = videosAllTime.map((video: Video) => {
      return { ...video, popularityAdjusted: video.popularity };
    });
  }

  private mergeVideos() {}

  private sortVideos() {}

  getPopularVideos(): Video[] {
    return this.popularVideos;
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

  testMethod(): string {
    return "Hola";
  }
}
