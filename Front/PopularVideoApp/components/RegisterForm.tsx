import { Container, TextField, Button, Typography, Box } from "@mui/material";

export const RegisterForm: React.FC<{ formTitle: string }> = ({
  formTitle,
}) => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black",
      }}
    >
      <h1>{formTitle}</h1>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          margin: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant='h6' sx={{ margin: "0px 20px", color: "black" }}>
          Nombre Usuario:
        </Typography>
        <TextField
          sx={{
            minWidth: "400px",
            margin: "0px 20px",
            border: "1px solid black",
          }}
          placeholder='Email'
          type='email'
        />
      </Box>
    </Container>
  );
};
