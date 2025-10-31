export type TMDBMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date?: string;
};

export type TMDBTvShow = {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  first_air_date?: string;
};

export type TMDBApiResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};
