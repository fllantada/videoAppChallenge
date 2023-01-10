import axios from "axios";

export default async function register(email: string, password: string) {
  const response = await axios.post(`http://localhost:8080/api/auth/signup`, {
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
  }
  return null;
}
