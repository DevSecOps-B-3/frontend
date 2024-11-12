import { axiosClient } from "../../lib/axios_client";

export const updateReview = (formData: {
  movie: string;
  comment: string;
  star: number;
}) => {
  return axiosClient.put("reviews", formData);
};
