import { axiosClient } from "../../lib/axios_client";

export const adminDeleteReview = (formData: {
  userId: string;
  movieId: string;
}) => {
  return axiosClient.delete(`reviews`, {
    data: {
      user: formData.userId,
      movie: formData.movieId,
    },
  });
};
