import React from "react";
import { Container, Input, Button, Typography, Box } from "@mui/material";
import { useVideos } from "../store/useVideos.store";
import { useUserStore } from "../store/userAuthUser.store";
import postEvent from "../services/postEvent";

export const CommentHolder: React.FC<{ videoId: string }> = ({ videoId }) => {
  const [token] = useUserStore((state) => [state.token]);
  const [updateVideo] = useVideos((state) => [state.updateVideo]);

  const [comment, setComment] = React.useState<string>("");
  const [coments, setComents] = React.useState<string[]>([]);

  const handleComment = (e: any) => {
    setComents([...coments, comment]);
    setComment("");
    postEvent(videoId, "addComment", token).then((video) => {
      if (video) {
        updateVideo(video);
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "30px 10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant='h6'
        sx={{ margin: " 20px", color: "black", width: "200px" }}
      >
        Comentarios
      </Typography>
      {coments.map((coment, i) => (
        <Typography
          variant='body2'
          sx={{ margin: "0px 20px", color: "black", width: "200px" }}
        >
          {`Comentario N° ${i} )     "${coment}"`}
        </Typography>
      ))}
      <Typography
        variant='h4'
        sx={{ margin: "50px 20px", color: "black", width: "400px" }}
      >
        Ingrese Comentario
      </Typography>
      <Input
        sx={{
          minWidth: "600px",
          height: "100px",
          margin: "0px 20px",
        }}
        placeholder='Ingrese comentario'
        type='text'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button
        sx={{
          minWidth: "600px",
          height: "50px",
          margin: "0px 20px",
        }}
        variant='contained'
        onClick={handleComment}
      >
        Enviar
      </Button>
    </Box>
  );
};
