import axios from "axios";
export default async function register(email: string, password: string) {
  const data = axios.post(`http://localhost:8080/auth/register`, {
    email,
    password,
  });
  console.log(data);
  return data;
}
