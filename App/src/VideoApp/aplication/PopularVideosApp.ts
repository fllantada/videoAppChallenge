import { Video } from "../domain/entities/video";
import { VideoRepository } from "../domain/video.repository";

const DEFAULT_QTY = 50;

export class PopularVideosApp {
  //Si bien puede verse muy redundante todo esto lo hago pensando en la consigna de
  //algo escalable

  private popularVideos: Video[] = [];
  private allVideos: Video[] = [];

  constructor(private videoRepository: VideoRepository) {
    this.updatePopularVideos();
  }

  private async updatePopularVideos(): Promise<void> {
    //reset cache
    this.popularVideos = [];
    this.allVideos = [];

    //get todays popular vidos
    const todayVideos = await this.getTodayPopulars(DEFAULT_QTY);
    //set min popularity
    const minPopularity =
      todayVideos[Math.min(todayVideos.length - 1, 4)]?.popularity + 100 || 0;

    //get all time popular videos
    const allTimePopulars = await this.getAllTimePopular(
      DEFAULT_QTY,
      minPopularity
    );

    //merge videos and remove duplicates

    const allVideos = this.mergeVideos(todayVideos, allTimePopulars);
    const allUniqueVideos = this.removeDuplicates(allVideos);

    //sort videos with bonus popularity of same day

    const sortedVideos = this.sortVideos(allUniqueVideos);

    this.allVideos = sortedVideos;

    this.popularVideos = sortedVideos.slice(0, 5);
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
      //randomize in case of same popularity
      return Math.random() >= 0.5 ? -1 : 1;
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

  public async getPopularVideos(): Promise<Video[]> {
    this.popularVideos.length || (await this.updatePopularVideos());
    return this.popularVideos;
  }

  public async getVideo(id: string): Promise<Video> {
    //first try local
    const video = this.popularVideos.find((video) => video._id === id);
    if (video) return video;

    //go find to DB
    return await this.videoRepository.getVideo(id);
  }

  public async likeEvent(
    id: string,
    action: "addLike" | "removeLike"
  ): Promise<Video> {
    const video = await this.getVideo(id);
    let newPopularity = video.popularity;

    if (action === "removeLike") newPopularity = video.popularity - 5;

    if (action === "addLike") newPopularity = video.popularity + 10;

    const editedVideo = await this.videoRepository.editPopularity(
      id,
      newPopularity
    );

    this.checkUpdateNeeded(editedVideo);

    return editedVideo;
  }

  private checkUpdateNeeded(video: Video): void {
    if (
      video.popularity > this.allVideos[this.allVideos.length - 1].popularity
    ) {
      this.updatePopularVideos();
    }
  }

  public async commentEvent(
    id: string,
    action: "addComment" | "removeComment"
  ): Promise<Video> {
    const video = await this.getVideo(id);
    let newPopularity = video.popularity;
    if (action === "addComment") newPopularity = video.popularity + 1;
    if (action === "removeComment") newPopularity = video.popularity - 1;

    const editedVideo = await this.videoRepository.editPopularity(
      id,
      newPopularity
    );

    this.checkUpdateNeeded(editedVideo);

    return editedVideo;
  }

  testMethod(): string {
    return "Hola";
  }
}
