import create from "zustand";
import { Video } from "../domain/video.entity";

interface VideosApi {
  videos: Video[];
  setStoreVideos: (videos: Video[]) => void;
  updateVideo: (video: Video) => void;
}

export const useVideos = create<VideosApi>((set) => ({
  videos: [],
  setStoreVideos: (videos: Video[]) =>
    set((state) => ({ ...state, videos: videos })),
  updateVideo: (video: Video) =>
    set((state) => ({
      ...state,
      videos: state.videos.map((v) => (v._id === video._id ? video : v)),
    })),
}));
