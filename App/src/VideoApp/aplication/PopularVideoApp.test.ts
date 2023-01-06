import { Video } from "../domain/entities/video";
import { VideoRepository } from "../domain/video.repository";
import { PopularVideosApp } from "./PopularVideosApp";
import * as fakeVideos from "./fakeVideos.json";

const mockVideos = fakeVideos;

const mockVideoRepository: VideoRepository = {
  getTodayPopularVideos: jest.fn().mockResolvedValue([]),
  getPopularVideos: jest.fn().mockResolvedValue([]),
  getVideo: jest.fn().mockResolvedValue([]),
  editPopularity: jest.fn().mockResolvedValue({} as Video),
};

describe("PopularVideosApp", () => {
  it("should return the most popular videos", async () => {
    const popularVideosApp = new PopularVideosApp(mockVideoRepository);
    const popularVideos = await popularVideosApp.getPopularVideos();
    expect(popularVideos.length).toBe(5);
  });
});
