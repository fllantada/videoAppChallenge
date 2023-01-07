import axios from "axios";
import { Video } from "../domain/video.entity";

export async function getPopularVideos(): Promise<Video[]> {
  const response = await axios.get(`http://localhost:8080/api/videos`);
  //logica de validacion de DTO

  if (response.status !== 200) {
    throw new Error("Error al obtener videos");
  }

  if (!response.data) {
    throw new Error("Error al obtener videos");
  }

  return response.data;
}
