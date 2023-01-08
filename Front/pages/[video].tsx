import type { NextPage } from "next";
import { Title } from "../PopularVideoApp/components/Title";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { VideoSingleCard } from "../PopularVideoApp/components/VideoSingleCard";
import { useVideos } from "../PopularVideoApp/store/useVideos.store";

import { useUser } from "../PopularVideoApp/store/userUser.Store";

const Video: NextPage = () => {
  const router = useRouter();
  const id = router.query.video;
  const [videos] = useVideos((state) => [state.videos]);

  /*   const [user, setAuthenticated] = useUser((state) => [
    state.user,
    state.setAuthenticated,
  ]); */

  if (typeof id !== "string") return <p>Invalid id</p>;

  const pageSelectedVideo = videos.find((video) => video._id === id);

  if (!pageSelectedVideo) return <p>Video not found</p>;

  console.log("desde [videos] videos es:", videos, "y id es:", id);

  return (
    <>
      <Title text={`${pageSelectedVideo.title}`} />
      <Box justifyItems='center' alignItems={"center"}>
        <VideoSingleCard video={pageSelectedVideo} />
      </Box>
    </>
  );
};

export default Video;
