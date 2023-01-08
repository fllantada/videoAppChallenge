import axios from "axios";
import { Video } from "../domain/video.entity";

export async function getSingleVideo(id: string): Promise<Video> {
  const response = await axios.get(`http://localhost:8080/api/videos/${id}`);
  //logica de validacion de DTO

  if (response.status !== 200) {
    throw new Error("Error al obtener videos");
  }

  if (!response.data) {
    throw new Error("Error al obtener videos");
  }

  //logica de validacion de DTO

  return response.data;
}
