const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

//TMDBMovie 타입 정의 추후 사용을 위해 export
export type TMDBMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date?: string;
};

//US tv shows 부분
export async function fetchUSTVShows(
  language = "en-US",
  with_origin_country = "US",
  page = 1
) {
  const res = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=${language}&sort_by=popularity.desc&with_origin_country=${with_origin_country}&page=${page}`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  return data.results;
}

//TV Thriller Mysteries 부분
//Tv 장르에는 Thriller 장르 코드가 없음
//Mystery 장르코드인 9648만 사용
export async function fetchThrillerMysteryMovies(
  language = "en-US",
  page = 1,
  with_genres = "9648"
) {
  const res = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=${language}&with_genres=${with_genres}&sort_by=popularity.desc&page=${page}`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  const tvShows = data.results.slice(0, 5); // 상위 5개
  return tvShows;
}
//New Releases 부분
export async function fetchNewReleases(
  language = "en-US",
  page = 1,
  region = "US"
) {
  const res = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=${language}&page=${page}&region=${region}`,
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

//Netflix Originals 부분
export async function fetchNetflixOriginals(
  language = "en-US",
  page = 1,
  netflixID = 213,
  with_watch_providers = 8,
  watch_region = "US"
) {
  //netflix originals 영화 API 호출
  const moviesRes = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${language}&with_watch_providers=${with_watch_providers}&watch_region=${watch_region}&sort_by=popularity.desc&page=${page}`,
    {
      next: { revalidate: 3600 }, // ISR 캐싱: 1시간마다 새로 패치
    }
  );
  const moviesData = await moviesRes.json();
  const movies = moviesData.results.slice(0, 5) || []; // 상위 5개

  //netflix originals tv 쇼 API 호출
  const tvRes = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=${language}&with_networks=${netflixID}&sort_by=popularity.desc&page=${page}`,
    {
      next: { revalidate: 3600 }, // ISR 캐싱: 1시간마다 새로 패치
    }
  );
  const tvShowData = await tvRes.json();
  const tvShows = tvShowData.results.slice(0, 5) || []; // 상위 5개

  const combined = [...movies, ...tvShows];
  return combined;
}

//Nollywood Movies & TV 부분
export async function fetchNollywoodMovies(
  region = "NG",
  language = "en-US",
  page = 1
) {
  //나이지리아 영화 API 호출
  const moviesRes = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_origin_country=${region}&language=${language}&sort_by=popularity.desc&page=${page}`,
    {
      next: { revalidate: 3600 }, // ISR 캐싱: 1시간마다 새로 패치
    }
  );
  const moviesData = await moviesRes.json();
  const movies = moviesData.results.slice(0, 5) || []; // 상위 5개

  //나이지리아 tv 쇼 API 호출
  const tvRes = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_origin_country=${region}&language=${language}&sort_by=popularity.desc&page=${page}`,
    {
      next: { revalidate: 3600 }, // ISR 캐싱: 1시간마다 새로 패치
    }
  );
  const tvShowData = await tvRes.json();
  const tvShows = tvShowData.results.slice(0, 5) || []; // 상위 5개

  const combined = [...movies, ...tvShows];
  return combined;
}

//African Movies 부분
//with_origin_country=NG → 그 나라에서 상영 중인 영화가 아닌 진짜 나이지리아 영화/TV 선택
export async function fetchAfricanMovies(
  region = "ZA",
  language = "en-US",
  page = 1
) {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&with_origin_country=${region}&language=${language}&page=${page}`,
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

//Top 10 in Nigiria 부분
export async function fetchTop10Movies(
  region = "NG", //기준 국가 정할 수 있음
  language = "en-US",
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
  language = "en-US",
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
export async function fetchPopularMovies(language = "en-US", page = 1) {
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
export async function fetchMovieById(id: number, language = "en-US") {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${language}`
  );
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}

//tv 포스터 가져오기
export async function fetchTvById(id: number, language = "en-US") {
  const res = await fetch(
    `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=${language}`
  );
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}
