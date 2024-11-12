import { axiosClient } from "../../lib/axios_client";

export const getAllMovies = () => {
  return axiosClient.get("/movies");
};
