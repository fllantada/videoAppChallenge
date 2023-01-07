import { useState, useEffect } from "react";
import { getPopularVideos } from "../services/getPopularVideos";
import { Video } from "../domain/video.entity";

export function usePopularVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getPopularVideos();
      setVideos(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return { videos, loading };
}
