import { axiosClient } from "../../lib/axios_client";

export const deleteReview = (movieId: string) => {
  return axiosClient.delete(`reviews`, {
    data: {
      movie: movieId,
    },
  });
};
