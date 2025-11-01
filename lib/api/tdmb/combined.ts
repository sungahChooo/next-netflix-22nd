import { BASE_URL, API_KEY, REVALIDATE_TIME } from "../../constants/tdmbs";
import type { TMDBApiResponse, TMDBMovie, TMDBTvShow } from "../types/tdmbs";

//Netflix Originals 부분
export async function fetchNetflixOriginals(
  language = "en-US",
  page = 1,
  netflixID = 213,
  with_watch_providers = 8,
  watch_region = "US"
) {
  const [movieRes, tvRes] = await Promise.all([
    fetch(
      //netflix originals 영화 API 호출
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${language}&with_watch_providers=${with_watch_providers}&watch_region=${watch_region}&sort_by=popularity.desc&page=${page}`,
      { next: { revalidate: REVALIDATE_TIME } }
    ),
    fetch(
      //netflix originals tv 쇼 API 호출
      `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=${language}&with_networks=${netflixID}&sort_by=popularity.desc&page=${page}`,
      { next: { revalidate: REVALIDATE_TIME } }
    ),
  ]);

  const movieData: TMDBApiResponse<TMDBMovie> = await movieRes.json();
  const tvData: TMDBApiResponse<TMDBTvShow> = await tvRes.json();

  return [...movieData.results.slice(0, 5), ...tvData.results.slice(0, 5)];
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
