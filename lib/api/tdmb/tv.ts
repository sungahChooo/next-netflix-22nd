import axios from 'axios';
import { BASE_URL, API_KEY, REVALIDATE_TIME } from '../../constants/tdmbs';
import type { TMDBTvShow, TMDBApiResponse } from '../types/tdmbs';

//US tv shows 부분
export async function fetchUSTVShows(language = 'en-US', with_origin_country = 'US', page = 1) {
  try {
    const res = await axios.get<TMDBApiResponse<TMDBTvShow>>(`${BASE_URL}/discover/tv`, {
      params: {
        api_key: API_KEY,
        language,
        with_origin_country,
        page,
      },
    });
    return res.data.results;
  } catch (error) {
    console.log('fetch us tv show error: ', error);
    return [];
  }
}

//TV Thriller Mysteries 부분
//Tv 장르에는 Thriller 장르 코드가 없음
//Mystery 장르코드인 9648만 사용
export async function fetchMysteryTv(language = 'en-US', page = 1, with_genres = '9648') {
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
    console.log('fetch Mystery Tv error:', error);
    return [];
  }
}

//tv 포스터 가져오기
export async function fetchTvById(id: number, language = 'en-US') {
  try {
    const res = await axios.get(`${BASE_URL}/tv/${id}`, {
      params: {
        api_key: API_KEY,
        id,
        language,
      },
    });

    return res.data;
  } catch (error) {
    console.log('fetch tv by id error: ', error);
    return null;
  }
}
