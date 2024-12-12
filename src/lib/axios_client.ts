import axios from "axios";
import Cookies from "js-cookie";

export const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_URL_VULNER}/`,
});

axiosClient.interceptors.request.use((config) => {
  // const token = localStorage.getItem("ACCESS_TOKEN");
  const token = Cookies.get("ACCESS_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      // localStorage.removeItem("ACCESS_TOKEN");
      Cookies.remove("ACCESS_TOKEN");
      window.location.href = "/";
    }
    if (response.status === 403 && response.data.message === "Invalid token") {
      // localStorage.removeItem("ACCESS_TOKEN");
      Cookies.remove("ACCESS_TOKEN");
      window.location.href = "/";
    }
    throw error;
  }
);
