import { axiosClient } from "../../lib/axios_client";

export const getProfile = () => {
  return axiosClient.get("users/user");
};

