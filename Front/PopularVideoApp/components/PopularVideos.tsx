import { Container } from "@mui/material";
import { usePopularVideos } from "../hooks/usePopularVideos";

export const PopularVideos: React.FC = () => {
  const { videos, loading } = usePopularVideos();

  console.log(videos);

  return (
    <Container
      maxWidth='lg'
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? <h1>Loading...</h1> : videos[0].title}
    </Container>
  );
};
