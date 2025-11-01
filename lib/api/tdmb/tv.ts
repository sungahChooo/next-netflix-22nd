import { BASE_URL, API_KEY, REVALIDATE_TIME } from "../../constants/tdmbs";
import type { TMDBTvShow, TMDBApiResponse } from "../types/tdmbs";

//US tv shows 부분
export async function fetchUSTVShows(
  language = "en-US",
  with_origin_country = "US",
  page = 1
): Promise<TMDBTvShow[]> {
  const res = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=${language}&sort_by=popularity.desc&with_origin_country=${with_origin_country}&page=${page}`,
    { next: { revalidate: REVALIDATE_TIME } }
  );
  const data: TMDBApiResponse<TMDBTvShow> = await res.json();
  return data.results;
}

export async function fetchThrillerMysteryTV(
  language = "en-US",
  page = 1
): Promise<TMDBTvShow[]> {
  const res = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=${language}&with_genres=9648&sort_by=popularity.desc&page=${page}`,
    { next: { revalidate: REVALIDATE_TIME } }
  );
  const data: TMDBApiResponse<TMDBTvShow> = await res.json();
  return data.results.slice(0, 5);
}

//tv 포스터 가져오기
export async function fetchTvById(id: number, language = "en-US") {
  const res = await fetch(
    `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=${language}`
  );
  if (!res.ok) throw new Error("Failed to fetch movie details");
  return res.json();
}
