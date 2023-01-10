import axios from "axios";
import { useUserStore } from "../store/userAuthUser.store";

export async function logIn(email: string, password: string) {
  const response = await axios.post(`http://localhost:8080/api/auth/login`, {
    email: email,
    password: password,
  });

  if (response.status !== 200) {
    throw new Error("Error al Logearse");
  }

  if (!response.data) {
    throw new Error("Error al obtener permisos");
  }

  const token: string = response.data?.token;
  if (token) {
    return token;
  } else {
    throw new Error("Error al obtener permisos");
  }
}
