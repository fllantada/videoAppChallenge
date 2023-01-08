import { AppBar, Input, Button } from "@mui/material";
import { useState } from "react";

export const Nav: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AppBar position='relative' style={{ backgroundColor: "#E8E8E8" }}>
      {isLoggedIn ? (
        <Button variant='contained' onClick={() => setIsLoggedIn(false)}>
          Cerrar sesión
        </Button>
      ) : (
        <>
          <Input placeholder='Usuario' />
          <Input placeholder='Contraseña' type='password' />
          <Button variant='contained' onClick={() => setIsLoggedIn(true)}>
            Iniciar sesión
          </Button>
        </>
      )}
    </AppBar>
  );
};
