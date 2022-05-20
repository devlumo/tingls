import axios from "axios";

let API_URL = "http://127.0.0.1:8080/api/";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "production") {
  API_URL = "https://tingls.io:8080/api/";
}

export const like = async (soundId, val) =>
  axios.patch(
    `${API_URL}sounds/${soundId}/likeSound/`,
    { val: val },
    { withCredentials: true }
  );

export const getUserData = async () => {
  return axios.get(`${API_URL}auth/getSession`, { withCredentials: true });
};

export const login = async (email, password) => {
  return await axios.post(
    `${API_URL}auth/login/`,
    {
      email: email.value,
      password: password.value,
    },
    { withCredentials: true }
  );
};

export const signUp = async (username, fullname, email, password) => {
  return await axios.post(
    `${API_URL}auth/signup/`,
    {
      userName: username.value,
      fullName: fullname.value,
      email: email.value,
      password: password.value,
    },
    { withCredentials: true }
  );
};

export const fetchSounds = async () => {
  return await axios.get(`${API_URL}sounds/`, {
    withCredentials: true,
  });
};

export const fetchMixes = async () => {
  return await axios.get(`${API_URL}sounds/getAllMixes`, {
    withCredentials: true,
  });
};

export const createMix = async (name, data, creator) => {
  return await axios.post(
    `${API_URL}sounds/createMix`,
    {
      name: name.value,
      data,
      creator,
    },
    { withCredentials: true }
  );
};
