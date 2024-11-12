import { axiosClient } from "../../lib/axios_client";

export const loginUser = (formData: { email: string; password: string }) => {
  return axiosClient.post("users/login", formData);
};
