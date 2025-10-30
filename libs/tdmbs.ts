const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export type TMDBMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date?: string;
};

export async function fetchPopularMovies(language = "ko-KR", page = 1) {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${language}&page=${page}`,
    {
      next: { revalidate: 3600 }, // ISR 캐싱: 1시간마다 새로 패치
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await res.json(); //응답 받은 json 저장
  return data.results;
}

export async function fetchMovieById(id: number, language = "ko-KR") {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${language}`
  );
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}
