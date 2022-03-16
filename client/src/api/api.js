import axios from "axios";

export const like = (soundId, val) =>
  axios.patch(
    `http://127.0.0.1:8080/api/sounds/${soundId}/likeSound/`,
    { val: val },
    { withCredentials: true }
  );
