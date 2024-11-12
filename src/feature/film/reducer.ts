export interface ReviewStateType {
  movieId: string;
  comment: string;
  star: number;
}

export const reviewInitialState = {
  movieId: "",
  comment: "",
  star: 1,
};

export interface ReviewActionType {
  type: string;
  payload: string | number;
}

export const reviewReducer = (
  state: ReviewStateType = reviewInitialState,
  action: ReviewActionType
) => {
  switch (action.type) {
    case "SET_MOVIE_ID":
      if (typeof action.payload === "string") {
        return { ...state, movieId: action.payload };
      }
      return state;
    case "UPDATE_REVIEW":
      if (typeof action.payload === "string") {
        return { ...state, comment: action.payload };
      }
      return state;

    case "UPDATE_RATING":
      if (typeof action.payload === "number") {
        return { ...state, star: action.payload };
      }
      return state;

    default:
      return state;
  }
};
