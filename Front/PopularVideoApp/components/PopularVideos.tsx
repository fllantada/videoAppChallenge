import { Grid } from "@mui/material";
import { usePopularVideos } from "../hooks/usePopularVideos";
import { VideoCard } from "./VideoGroupCard";
import { useRouter } from "next/router";
import { Video } from "../domain/video.entity";

export const PopularVideos: React.FC = () => {
  const { videos, loading } = usePopularVideos();
  const router = useRouter();

  const redirect = (video: Video) => {
    router.push(`/${video._id}`);
  };
  console.log("Desde PopularVideos.tsx", videos);

  return (
    <Grid container spacing={3} justifyContent='center'>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        videos.map((video, index) => (
          <Grid
            sx={{ cursor: "pointer" }}
            onClick={() => redirect(video)}
            item
            key={index}
          >
            <VideoCard video={video} />
          </Grid>
        ))
      )}
    </Grid>
  );
};
