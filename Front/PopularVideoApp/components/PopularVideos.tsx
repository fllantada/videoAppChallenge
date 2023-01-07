import { Grid } from "@mui/material";
import { usePopularVideos } from "../hooks/usePopularVideos";
import { VideoCard } from "./VideoCard";

export const PopularVideos: React.FC = () => {
  const { videos, loading } = usePopularVideos();

  return (
    <Grid container spacing={3} justifyContent='center'>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        videos.map((video, index) => (
          <Grid item>
            <VideoCard video={video} />
          </Grid>
        ))
      )}
    </Grid>
  );
};
