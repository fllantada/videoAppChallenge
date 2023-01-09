import axios from "axios";

export async function logIn(email: string, password: string) {
  const response = await axios.post(`http://localhost:8080/api/auth/login`, {
    email,
    password,
  });

  if (response.status !== 200) {
    throw new Error("Error al Logearse");
  }

  if (!response.data) {
    throw new Error("Error al obtener videos");
  }
  console.log(response.data);

  return response.data;
}
