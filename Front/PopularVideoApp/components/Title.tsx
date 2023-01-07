import { Container, Typography } from "@mui/material";

export const Title: React.FC<{ text: string }> = ({ text }) => {
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
      <Typography variant='h1' align='center' color='primary'>
        {text}
      </Typography>
    </Container>
  );
};
