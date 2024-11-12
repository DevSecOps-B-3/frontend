export interface MovieType {
  id: string;
  title: string;
  overview: string;
  release_date: string;
  image: string;
  language: string;
  genres: string[];
  reviews: ReviewType[];
}

export interface MovieListType {
  id: string;
  poster: string;
  title: string;
}

export interface ReviewType {
  id: string;
  userName: string;
  star: number;
  userId: string;
  comment: string;
}
