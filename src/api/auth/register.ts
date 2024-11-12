import { axiosClient } from "../../lib/axios_client";

export const registerUser = (formData: {
  email: string;
  name: string;
  password: string;
}) => {
  return axiosClient.post("users/register", formData);
};
