import { BASE_URL, API_KEY, REVALIDATE_TIME } from "../../constants/tdmbs";
import type { TMDBApiResponse, TMDBMovie } from "../types/tdmbs";

export async function fetchNewReleases(
  language = "en-US",
  page = 1,
  region = "US"
): Promise<TMDBMovie[]> {
  const res = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=${language}&page=${page}&region=${region}`,
    { next: { revalidate: REVALIDATE_TIME } }
  );
  if (!res.ok) throw new Error("Failed to fetch movies");
  const data: TMDBApiResponse<TMDBMovie> = await res.json();
  return data.results;
}

export async function fetchPopularMovies(
  language = "en-US",
  page = 1
): Promise<TMDBMovie[]> {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${language}&page=${page}`,
    { next: { revalidate: REVALIDATE_TIME } }
  );
  if (!res.ok) throw new Error("Failed to fetch movies");
  const data: TMDBApiResponse<TMDBMovie> = await res.json();
  return data.results;
}

// 그 외 movie 관련 (Top10, African 등)
