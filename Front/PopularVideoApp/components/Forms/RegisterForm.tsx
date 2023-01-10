import { Container, Button } from "@mui/material";
import { useState } from "react";
import { FormInput } from "./FormInput";
import { useRouter } from "next/router";
import register from "../../services/register";
import { useUserStore } from "../../store/userAuthUser.store";

export const RegisterForm: React.FC<{ formTitle: string }> = ({
  formTitle,
}) => {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [setToken, setAuthenticated] = useUserStore((state) => [
    state.setToken,
    state.setAuthenticated,
  ]);

  const formControl = async () => {
    try {
      const token = await register(user.email, user.password);

      token && setToken(token);
      setAuthenticated(true);
      setUser({ email: "", password: "" });

      router.push("/");
    } catch (e) {
      alert("Error al registrarse");
    }
  };

  const handleInputs = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

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

      <FormInput
        cb={handleInputs}
        nombre='email'
        value={user.email}
        tipo='email'
        placeholder='email'
      />
      <FormInput
        cb={handleInputs}
        value={user.password}
        nombre='password'
        tipo='password'
        placeholder='contraseña'
      />
      <Button
        onClick={formControl}
        variant='outlined'
        sx={{ margin: "30px 10px", width: "200px", padding: "10 30px" }}
      >
        Registrar
      </Button>
    </Container>
  );
};
