import type { NextPage } from "next";
import { Title } from "../PopularVideoApp/components/Title";
import { useRouter } from "next/router";

import { VideoSingleCard } from "../PopularVideoApp/components/VideoSingleCard";
import { useSingleVideo } from "../PopularVideoApp/hooks/useSingleVideo";

const Video: NextPage = () => {
  const router = useRouter();
  const { video, loading } = useSingleVideo(router.query.video as string);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Title text={`Id:${video.title}`} />

      {<VideoSingleCard video={video} />}
    </>
  );
};

export default Video;
