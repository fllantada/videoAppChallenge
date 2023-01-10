import { AppBar, Input, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import { useUserStore } from "../store/userAuthUser.store";
import { logIn } from "../services/login";

export const Nav: React.FC = () => {
  const [authenticated, logOut, setToken, setAuthenticated] = useUserStore(
    (state) => [
      state.authenticated,
      state.logOut,
      state.setToken,
      state.setAuthenticated,
    ]
  );
  const [user, setUser] = useState({ email: "", password: "" });

  const router = useRouter();

  const handleInputs = (e: any) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const login = async () => {
    try {
      const token = await logIn(user.email, user.password);
      setUser({ email: "", password: "" });
      setToken(token);
      setAuthenticated(true);
    } catch (e) {
      alert("Usuario o contraseña incorrectos");
    }
  };

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
      {authenticated ? (
        <Button variant='contained' onClick={logOut}>
          Cerrar sesión
        </Button>
      ) : (
        <>
          <Typography variant='h6' sx={{ margin: "0px 20px", color: "black" }}>
            Logearse:
          </Typography>
          <Input
            name='email'
            onChange={handleInputs}
            value={user.email}
            sx={{ minWidth: "300px", margin: "0px 20px" }}
            placeholder='Email'
          />
          <Input
            name='password'
            onChange={handleInputs}
            value={user.password}
            sx={{ minWidth: "200px", margin: "0px 20px" }}
            placeholder='Contraseña'
            type='password'
          />
          <Button
            sx={{ minWidth: "150px", margin: "0px 20px" }}
            variant='contained'
            onClick={login}
          >
            Iniciar sesión
          </Button>
          <Button
            sx={{ minWidth: "150px", margin: "0px 20px" }}
            variant='contained'
            onClick={() => router.push("/register")}
          >
            Registrarse
          </Button>
        </>
      )}
    </AppBar>
  );
};
