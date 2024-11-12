import { axiosClient } from "../../lib/axios_client";

export const getDetailMovie = (id: string | undefined) => {
  return axiosClient.get(`/movies/${id}`);
};
