import { Container, Button } from "@mui/material";
import { useState } from "react";
import { FormInput } from "./FormInput";
import { useRouter } from "next/router";

export const RegisterForm: React.FC<{ formTitle: string }> = ({
  formTitle,
}) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const router = useRouter();
  const formControl = () => {
    setUser({ email: "", password: "" });
    router.push("/");
  };

  const handleEmail = (e: string) => {
    //logica validacion email
    setUser({ ...user, email: e });
  };
  const handlePassword = (e: string) => {
    //logica validacion contraseña
    setUser({ ...user, password: e });
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
        cb={handleEmail}
        nombre='Email'
        tipo='email'
        placeholder='email'
      />
      <FormInput
        cb={handlePassword}
        nombre='Contraseña'
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
