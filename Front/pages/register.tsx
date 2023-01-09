import { Container, TextField, Button, Typography, Box } from "@mui/material";
import type { NextPage } from "next";
import { RegisterForm } from "../PopularVideoApp/components/RegisterForm";
import { Title } from "../PopularVideoApp/components/Title";
const RegisterPage: NextPage = () => {
  return (
    <>
      <Title text='Registro a Video App' />
      <RegisterForm formTitle='Registro Usuario' />
    </>
  );
};

export default RegisterPage;
