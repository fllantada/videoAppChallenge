import React from "react";
import { Container, Input, Button, Typography, Box } from "@mui/material";

export const CommentHolder: React.FC<{ videoId: string }> = ({ videoId }) => {
  console.log(videoId);
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
        sx={{ margin: "0px 20px", color: "black", width: "200px" }}
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
      />
      <Button
        sx={{
          minWidth: "600px",
          height: "50px",
          margin: "0px 20px",
        }}
        variant='contained'
      >
        Enviar
      </Button>
    </Box>
  );
};
