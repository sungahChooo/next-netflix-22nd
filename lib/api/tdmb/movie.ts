import { BASE_URL, API_KEY } from '@/lib/constants/tdmbs';
import type { TMDBApiResponse, TMDBMovie, TMDBTvShow } from '@/lib/api/types/tdmbs';
import axios from 'axios';

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

//TV Thriller Mysteries 부분
//Tv 장르에는 Thriller 장르 코드가 없음
//Mystery 장르코드인 9648만 사용
export async function fetchMysteryMovies(language = 'en-US', page = 1, with_genres = '9648') {
  try {
    const res = await axios.get<TMDBApiResponse<TMDBTvShow>>(`${BASE_URL}/discover/tv`, {
      params: {
        api_key: API_KEY,
        language,
        page,
        with_genres,
      },
    });
    return res.data.results.slice(0, 5); // 상위 5개
  } catch (error) {
    console.log('fetchThrillerMysteryMovies error:', error);
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
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${language}`);
  if (!res.ok) throw new Error('Failed to fetch movie details');
  return res.json();
}
