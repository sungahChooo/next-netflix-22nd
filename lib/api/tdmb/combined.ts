import { BASE_URL, API_KEY, REVALIDATE_TIME } from '@/lib/constants/tdmbs';
import type { TMDBApiResponse, TMDBMovie, TMDBTvShow } from '@/lib/api/types/tdmbs';
import axios from 'axios';

//Netflix Originals 부분
export async function fetchNetflixOriginals(
  language = 'en-US',
  page = 1,
  netflixID = 213,
  with_watch_providers = 8,
  watch_region = 'US',
) {
  try {
    const [movieRes, tvRes] = await Promise.all([
      axios.get<TMDBApiResponse<TMDBMovie>>(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          language,
          with_watch_providers,
          watch_region,
          sort_by: 'popularity.desc',
          page,
        },
      }),
      axios.get<TMDBApiResponse<TMDBTvShow>>(`${BASE_URL}/discover/tv`, {
        params: {
          api_key: API_KEY,
          language,
          with_networks: netflixID,
          sort_by: 'popularity.desc',
          page,
        },
      }),
    ]);

    // axios는 자동으로 JSON 파싱해서 .data에 담깁니다.
    const movieData = movieRes.data;
    const tvData = tvRes.data;

    return [...movieData.results.slice(0, 5), ...tvData.results.slice(0, 5)];
  } catch (error) {
    console.error('❌ fetchNetflixOriginals error:', error);
    return [];
  }
}

//Hollywood Movies & TV 부분
export async function fetchHollywoodMovies(region = 'US', language = 'en-US', page = 1) {
  try {
    const [moviesRes, tvRes] = await Promise.all([
      axios.get<TMDBApiResponse<TMDBMovie>>(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          with_origin_country: region,
          language,
          sort_by: 'popularity.desc',
          page,
        },
      }),
      axios.get<TMDBApiResponse<TMDBTvShow>>(`${BASE_URL}/discover/tv`, {
        params: {
          api_key: API_KEY,
          with_origin_country: region,
          language,
          sort_by: 'popularity.desc',
          page,
        },
      }),
    ]);

    const movies = moviesRes.data.results.slice(0, 5);
    const tvShows = tvRes.data.results.slice(0, 5);

    return [...movies, ...tvShows];
  } catch (error) {
    console.error('❌ fetchHollywoodMovies error:', error);
    return [];
  }
}
