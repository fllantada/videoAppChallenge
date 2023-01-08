import { useState, useEffect } from "react";
import { getSingleVideo } from "../services/getSingleVideo";
import { Video } from "../domain/video.entity";
import { useRouter } from "next/router";

export function useSingleVideo(id: string) {
  const [video, setVideo] = useState<Video>({} as Video);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const data: Video = await getSingleVideo(id);

      setVideo(data);

      setLoading(false);
    }
    fetchData();
  }, []);

  return { video, loading };
}
