import axios from "axios";

const API_URL = "http://127.0.0.1:8080/api/";

export const like = async (soundId, val) =>
  axios.patch(
    `${API_URL}sounds/${soundId}/likeSound/`,
    { val: val },
    { withCredentials: true }
  );

export const getUserData = async () => {
  return axios.get(`${API_URL}auth/getSession`, { withCredentials: true });
};
