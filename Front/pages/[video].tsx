import type { NextPage } from "next";
import { Title } from "../PopularVideoApp/components/Title";
import { useRouter } from "next/router";
import { Container } from "@mui/material";
import { VideoSingleCard } from "../PopularVideoApp/components/VideoSingleCard";
import { useVideos } from "../PopularVideoApp/store/useVideos.store";
import { Nav } from "../PopularVideoApp/components/Nav";
import { CommentHolder } from "../PopularVideoApp/components/CommentHolder";
import { useUserStore } from "../PopularVideoApp/store/userAuthUser.store";

/* import { useUser } from "../PopularVideoApp/store/userAuthUser.store"; */

const Video: NextPage = () => {
  const router = useRouter();
  const id = router.query.video;
  const [videos] = useVideos((state) => [state.videos]);
  const [authenticated] = useUserStore((state) => [state.authenticated]);

  /*   const [user, setAuthenticated] = useUser((state) => [
    state.user,
    state.setAuthenticated,
  ]); */

  if (typeof id !== "string") return <p>Invalid id</p>;

  const pageSelectedVideo = videos.find((video) => video._id === id);

  if (!pageSelectedVideo) return <p>Video not found</p>;

  return (
    <>
      <Nav />
      <Title text={`${pageSelectedVideo.title}`} />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <VideoSingleCard video={pageSelectedVideo} />
        {authenticated && <CommentHolder videoId={pageSelectedVideo._id} />}
      </Container>
    </>
  );
};

export default Video;
