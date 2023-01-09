import axios from "axios";
type validAction = "addLike" | "removeLike" | "addComment" | "removeComment";

export default async function postEvent(videoId: string, action: validAction) {
  const response = await axios.post(`http://localhost:8080/api/events`, {
    videoId: videoId,
    action: action,
  });

  console.log(response);
}
