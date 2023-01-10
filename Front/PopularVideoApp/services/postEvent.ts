import axios from "axios";
import { useUserStore } from "../store/userAuthUser.store";
type validAction = "addLike" | "removeLike" | "addComment" | "removeComment";

export default async function postEvent(
  videoId: string,
  action: validAction,
  token: string
) {
  const header = "event-auth-token";
  console.log("videoID", videoId, "action:", action, "token: ", token);
  axios.defaults.headers.common[header] = token;

  const response = await axios.post(`http://localhost:8080/api/videos/event`, {
    videoId: videoId,
    action: action,
  });

  console.log(response.data.videoNow.popularity);
}
