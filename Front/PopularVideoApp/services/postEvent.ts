import axios from "axios";
import { useUserStore } from "../store/userAuthUser.store";
type validAction = "addLike" | "removeLike" | "addComment" | "removeComment";

export default async function postEvent(videoId: string, action: validAction) {
  const [token] = useUserStore((state) => [state.token]);

  const header = "event-auth-token";
  axios.defaults.headers.common[header] = token;

  const response = await axios.post(`http://localhost:8080/api/events`, {
    videoId: videoId,
    action: action,
  });

  console.log(response);
}
