import { Container, Typography } from "@mui/material";

export const PopularVideos: React.FC = () => {
  return (
    <Container
      maxWidth='lg'
      sx={{
        display: "flex",
        marginTop: "1rem",
        marginBottom: "2rem",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant='h5' align='center' color='primary'>
        VideoArea
      </Typography>
    </Container>
  );
};
