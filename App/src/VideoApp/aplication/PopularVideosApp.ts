import { Video } from "../domain/entities/video";
import { VideoRepository } from "../domain/video.repository";

export class PopularVideosApp {
  //Si bien puede verse muy redundante todo esto lo hago pensando en la consigna de
  //algo escalable

  private popularVideos: Video[] = [];

  constructor(private videoRepository: VideoRepository) {
    this.updatePopularVideos();
  }

  async updatePopularVideos(): Promise<void> {
    //get todays popular vidos
    const defaultQty = 10;
    const todayVideos = await this.getTodayPopulars(defaultQty);

    //set min popularity
    const minPopularity =
      todayVideos[Math.min(todayVideos.length - 1, 4)].popularity + 100;

    //get all time popular videos
    const allTimePopulars = await this.getAllTimePopular(
      defaultQty,
      minPopularity
    );

    const allVideos = this.mergeVideos(todayVideos, allTimePopulars);
    const allUniqueVideos = this.removeDuplicates(allVideos);

    const sortedVideos = this.sortVideos(allUniqueVideos);

    console.log(sortedVideos);

    console.log(
      "All videos length",
      todayVideos.length,
      allTimePopulars.length
    );
  }

  private async getTodayPopulars(qty: number): Promise<Video[]> {
    const videosToday = await this.videoRepository.getTodayPopularVideos(qty);

    if (!videosToday.length) {
      return [];
    }

    return videosToday;
  }

  private async getAllTimePopular(
    qty: number,
    minPop: number
  ): Promise<Video[]> {
    const videosAllTime = await this.videoRepository.getPopularVideos(
      qty,
      minPop
    );

    return videosAllTime;
  }

  private mergeVideos(todays: Video[], populars: Video[]): Video[] {
    return [...todays, ...populars];
  }

  private removeDuplicates(arr: Video[]): Video[] {
    return [...new Set(arr)];
  }

  private sortVideos(videos: Video[]): Video[] {
    return videos.sort((videoA: Video, videoB: Video) => {
      let aBonusPopularity = this.getDateBonusPopularity(videoA);
      let bBonusPopularity = this.getDateBonusPopularity(videoB);

      console.log(
        "A)",
        videoA.created_date.toLocaleString() + "BONUS:",

        aBonusPopularity,
        "B)",
        videoB.created_date.toLocaleString() + "BONUS:",
        bBonusPopularity
      );

      if (
        videoA.popularity + aBonusPopularity >
        videoB.popularity + bBonusPopularity
      )
        return -1;
      if (
        videoA.popularity + aBonusPopularity <
        videoB.popularity + bBonusPopularity
      )
        return 1;

      return 0;
    });
  }

  private getDateBonusPopularity(video: Video): number {
    const today = new Date();
    if (this.sameDay(video.created_date, today)) {
      return 100;
    }
    return 0;
  }

  private sameDay(d1: Date, d2: Date): boolean {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

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
