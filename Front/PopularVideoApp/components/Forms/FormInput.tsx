import { Container, TextField, Button, Typography, Box } from "@mui/material";
export const FormInput: React.FC<{
  nombre: string;
  tipo: "email" | "text" | "password";
  placeholder?: string;
  cb: (e: any) => void;
}> = ({ nombre, tipo, placeholder, cb }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        margin: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant='h6'
        sx={{ margin: "0px 20px", color: "black", width: "200px" }}
      >
        {nombre}
      </Typography>
      <TextField
        onChange={(e) => cb(e.target.value)}
        sx={{
          minWidth: "400px",
          margin: "0px 20px",
          border: "1px solid black",
        }}
        placeholder={placeholder}
        type={tipo}
      />
    </Box>
  );
};
