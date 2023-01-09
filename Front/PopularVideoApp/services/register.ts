import { useUserStore } from "../store/userAuthUser.store";
import axios from "axios";
export default async function register(email: string, password: string) {
  const response = await axios.post(`http://localhost:8080/auth/register`, {
    email,
    password,
  });

  const [setToken, setAuthenticated] = useUserStore((state) => [
    state.setToken,
    state.setAuthenticated,
  ]);

  if (response.status !== 200) {
    throw new Error("Error al Logearse");
  }

  if (!response.data) {
    throw new Error("Error al obtener permisos");
  }

  const token: string = response.data?.token;
  if (token) {
    setToken(response.data.token);
    setAuthenticated(true);
  }
}
