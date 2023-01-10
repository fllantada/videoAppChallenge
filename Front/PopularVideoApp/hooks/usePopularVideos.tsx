import { useState, useEffect } from "react";
import { getPopularVideos } from "../services/getPopularVideos";
import { Video } from "../domain/video.entity";
import { useVideos } from "../store/useVideos.store";

export function usePopularVideos() {
  const [videos, setPopularVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [setStoreVideos] = useVideos((state) => [state.setStoreVideos]);

  useEffect(() => {
    async function fetchData() {
      const data = await getPopularVideos();
      console.log("Estoy dentro de usePopularVideos.tsx");
      setPopularVideos(data);
      setLoading(false);
      setStoreVideos(data);
    }
    fetchData();
  }, []);

  console.log(videos);

  return { videos, loading };
}
