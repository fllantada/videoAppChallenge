import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Video } from "../domain/video.entity";
import { LikeFooter } from "./LikeFooter";
import { useUserStore } from "../store/userAuthUser.store";

export const VideoSingleCard: React.FC<{ video: Video }> = ({ video }) => {
  const [authenticated] = useUserStore((state) => [state.authenticated]);
  return (
    <Card
      sx={{
        width: 650,
      }}
    >
      <CardMedia
        component='img'
        height='300'
        image={video.thumbnail_url}
        alt={video.title}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          Title: {video.title}
        </Typography>
        <Typography variant='subtitle1'>Author: {video.author}</Typography>
        <Typography variant='subtitle1'>Views: {video.views}</Typography>
        <Typography variant='subtitle1'>
          Created: {video.created_date.slice(0, 10)}
        </Typography>
        <Typography variant='body2' color='primary'>
          Popularity: {video.popularity}
        </Typography>
        {authenticated && <LikeFooter videoId={video._id} />}
      </CardContent>
    </Card>
  );
};
