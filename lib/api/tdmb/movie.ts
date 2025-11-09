import { BASE_URL, API_KEY } from '@/lib/constants/tdmbs';
import type { TMDBApiResponse, TMDBMovie, TMDBTvShow } from '@/lib/api/types/tdmbs';
import axios from 'axios';

//search page 영화  부분
export async function fetchSearchMovie(
  language = 'ko-KR',
  query = '',
  page = 1,
  include_adult = false,
  limit = 10,
): Promise<TMDBMovie[]> {
  try {
    const res = await axios.get<TMDBApiResponse<TMDBMovie>>(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        language,
        query,
        page,
        include_adult,
        limit,
      },
    });
    const moviesWithImage = res.data.results.filter((movie) => movie.poster_path !== null);
    console.log('search movie:', res.data.results);
    return moviesWithImage;
  } catch (error) {
    console.error('❌ fetch search movie error:', error);
    return [];
  }
}

//New Releases 부분
export async function fetchNewReleases(language = 'en-US', page = 1, region = 'US'): Promise<TMDBMovie[]> {
  try {
    const res = await axios.get<TMDBApiResponse<TMDBMovie>>(`${BASE_URL}/movie/now_playing`, {
      params: {
        api_key: API_KEY,
        language,
        page,
        region,
      },
    });
    return res.data.results;
  } catch (error) {
    console.error('❌ fetchNewReleases error:', error);
    return [];
  }
}

//Popular movies부분
export async function fetchPopularMovies(language = 'en-US', page = 1): Promise<TMDBMovie[]> {
  try {
    const res = await axios.get<TMDBApiResponse<TMDBMovie>>(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language,
        page,
      },
    });
    return res.data.results;
  } catch (error) {
    console.error('fetchPopularMovies error:', error);
    return [];
  }
}

//Korean Movies 부분
//한국 영화 인기순 조회
//with_origin_country=KR → 그 나라에서 상영 중인 영화가 아닌 진짜 한국 영화/TV 선택
export async function fetchKoreanMovies(region = 'KR', language = 'en-US', page = 1) {
  try {
    const res = await axios.get<TMDBApiResponse<TMDBMovie>>(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_origin_country: region,
        sort_by: 'popularity.desc',
        language,
        page,
      },
    });
    return res.data.results;
  } catch (error) {
    console.log('fetch Korean Movies error:', error);
    return [];
  }
}

//Top 10 in Korea 부분
export async function fetchTop10Movies(
  region = 'KR', //기준 국가 정할 수 있음
  language = 'en-US',
  page = 1,
) {
  try {
    const res = await axios.get<TMDBApiResponse<TMDBMovie>>(`${BASE_URL}/movie/top_rated`, {
      params: {
        api_key: API_KEY,
        region,
        language,
        sort_by: 'popularity.desc',
        page,
      },
    });

    return res.data.results;
  } catch (error) {
    console.log('fetch top 10 movies error:', error);
    return [];
  }
}

//Trending Now 부분
export async function fetchTrendingMovies(
  timeWindow: 'day' | 'week' = 'week', // day: 24시간, week: 7일 선택 가능
  language = 'en-US',
  page = 1,
) {
  try {
    const res = await axios.get<TMDBApiResponse<TMDBMovie>>(`${BASE_URL}/trending/movie/${timeWindow}`, {
      params: {
        api_key: API_KEY,
        timeWindow,
        language,
        sort_by: 'popularity.desc',
        page,
      },
    });
    return res.data.results;
  } catch (error) {
    console.log('fetch trending movies error:', error);
    return [];
  }
}

//영화 포스터 가져오기 Continue Watching & My List 부분
export async function fetchMovieById(id: number, language = 'en-US') {
  try {
    const res = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        id,
        language,
      },
    });

    return res.data;
  } catch (error) {
    console.log('fetch movie by id error: ', error);
    return null;
  }
}
