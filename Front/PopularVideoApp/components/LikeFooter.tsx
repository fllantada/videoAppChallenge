import React from "react";
import { Container, Button, Typography, Box } from "@mui/material";
import { useState } from "react";
import postEvent from "../services/postEvent";
import { useUserStore } from "../store/userAuthUser.store";

export const LikeFooter: React.FC<{ videoId: string }> = ({ videoId }) => {
  const [likes, setLikes] = useState(0);
  const [token] = useUserStore((state) => [state.token]);

  const handleLikes = (e: any) => {
    if (likes === 0 && e.target.name === "addLike") {
      setLikes(1);
      postEvent(videoId, "addLike", token);
    }
    if (likes === 1 && e.target.name === "removeLike") {
      setLikes(0);
      postEvent(videoId, "removeLike", token);
    }
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
      <Button
        sx={{
          minWidth: "200px",
          margin: "0px 20px",
        }}
        name='addLike'
        onClick={handleLikes}
        variant='contained'
      >
        Like
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
        Not Like
      </Button>
    </Box>
  );
};
