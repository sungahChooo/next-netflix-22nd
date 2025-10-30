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

//Top 10 in Nigiria 부분
export async function fetchTop10Movies(
  region = "NG", //기준 국가 정할 수 있음
  language = "ko-KR",
  page = 1
) {
  const res = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&region=${region}&language=${language}&page=${page}`,
    {
      next: { revalidate: 3600 }, // ISR 캐싱: 1시간마다 새로 패치
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await res.json();
  return data.results;
}

//Trending Now 부분
export async function fetchTrendingMovies(
  timeWindow: "day" | "week" = "week", // day: 24시간, week: 7일 선택 가능
  language = "ko-KR",
  page = 1
) {
  const res = await fetch(
    `${BASE_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}&language=${language}&page=${page}`,
    {
      next: { revalidate: 3600 }, // ISR 캐싱: 1시간마다 새로 패치
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await res.json();
  return data.results;
}

//Popular on Netflix 부분
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

  const data = await res.json();
  return data.results;
}

//영화 포스터 가져오기 Continue Watching & My List 부분
export async function fetchMovieById(id: number, language = "ko-KR") {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${language}`
  );
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}
