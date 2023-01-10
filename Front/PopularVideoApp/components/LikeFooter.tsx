import React from "react";
import { Container, Button, Typography, Box } from "@mui/material";
import { useState } from "react";

import postEvent from "../services/postEvent";
import { useUserStore } from "../store/userAuthUser.store";
import { Video } from "../domain/video.entity";
import { useVideos } from "../store/useVideos.store";

export const LikeFooter: React.FC<{ videoId: string }> = ({ videoId }) => {
  const [likes, setLikes] = useState(0);
  const [token] = useUserStore((state) => [state.token]);
  const [updateVideo] = useVideos((state) => [state.updateVideo]);

  const handleLikes = (e: any) => {
    let newVideo;
    if (likes === 0 && e.target.name === "addLike") {
      setLikes(1);
      newVideo = postEvent(videoId, "addLike", token);
    }
    if (likes === 1 && e.target.name === "removeLike") {
      setLikes(0);
      newVideo = postEvent(videoId, "removeLike", token);
    }
    newVideo &&
      newVideo.then((video: Video | null) => {
        if (video) {
          updateVideo(video);
        }
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        margin: "30px 0px 0px ",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant='h6' sx={{ margin: "0px 20px" }}>
        Likes: {likes}
      </Typography>
      <Button
        sx={{
          minWidth: "200px",
          margin: "0px 20px",
        }}
        name='addLike'
        onClick={handleLikes}
        variant='contained'
      >
        Add Like
      </Button>
      <Button
        sx={{
          minWidth: "200px",
          margin: "0px 20px",
        }}
        name='removeLike'
        variant='contained'
        color='error'
        onClick={handleLikes}
      >
        remove Like
      </Button>
    </Box>
  );
};
