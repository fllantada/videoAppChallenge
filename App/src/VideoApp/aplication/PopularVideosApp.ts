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

    console.log("Today Popular Videos");
    console.log(this.todayPopularVideos);
    /*    console.log("Not Today Popular Videos");
    console.log(this.notTodayPopularVideos);
    console.log("Min Popularity");
    console.log(this.minPopularity);
    console.log("Today");
    console.log(this.today); */

    /*   this.popularVideos = mergeVideos();
    sortByVideos(); */
  }

  private async getTodayPopular(): Promise<void> {
    const videosToday = await this.videoRepository.getTodayPopularVideos(10);

    if (videosToday.length) {
      console.log(
        videosToday.map((video: any) => {
          return { ...video, popularity: video.popularity + 100 };
        })
      );
      //
      this.minPopularity =
        videosToday[Math.min(videosToday.length - 1, 4)].popularity + 100;
    }
  }

  private async getAllTimePopular(): Promise<void> {
    this.notTodayPopularVideos = await this.videoRepository.getPopularVideos(
      10,
      this.minPopularity
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
  testMethod() {
    console.log("testmethod called");
  }
}
