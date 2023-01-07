import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Video } from "../domain/video.entity";

export const VideoCard: React.FC<{ video: Video }> = ({ video }) => {
  console.log(video);

  return (
    <Card
      sx={{
        width: 350,
      }}
    >
      <CardMedia
        component='img'
        height='140'
        image={video.thumbnail_url}
        alt={video.title}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {video.title}
        </Typography>
        <Typography variant='body2' color='primary'>
          Popularity: {video.popularity}
        </Typography>
      </CardContent>
    </Card>
  );
};
