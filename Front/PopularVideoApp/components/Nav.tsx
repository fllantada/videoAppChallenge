import { AppBar, Input, Button, Typography } from "@mui/material";
import { useState } from "react";

export const Nav: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppBar
      position='relative'
      style={{
        backgroundColor: "#E8E8E8",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "right",
      }}
    >
      {isLoggedIn ? (
        <Button variant='contained' onClick={() => setIsLoggedIn(false)}>
          Cerrar sesión
        </Button>
      ) : (
        <>
          <Typography variant='h6' sx={{ margin: "0px 20px", color: "black" }}>
            Ingrese email y contraseña para poder dar Like o comentar el video:
          </Typography>
          <Input
            sx={{ minWidth: "400px", margin: "0px 20px" }}
            placeholder='Email'
          />
          <Input
            sx={{ minWidth: "200px", margin: "0px 20px" }}
            placeholder='Contraseña'
            type='password'
          />
          <Button
            sx={{ minWidth: "200px", margin: "0px 20px" }}
            variant='contained'
            onClick={() => setIsLoggedIn(true)}
          >
            Iniciar sesión
          </Button>
        </>
      )}
    </AppBar>
  );
};
