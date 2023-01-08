import create from "zustand";
import { Video } from "../domain/video.entity";

interface VideosApi {
  videos: Video[];
  setStoreVideos: (videos: Video[]) => void;
}

export const useVideos = create<VideosApi>((set) => ({
  videos: [],
  setStoreVideos: (videos: Video[]) =>
    set((state) => ({ ...state, videos: videos })),
}));
