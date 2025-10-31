export interface tmdbTitle {
  id: number;
  title?: string;
  name?: string;
  backdrop_path?: string | null;
  poster_path?: string | null; //프리뷰사진용
}

//generic type으로 tmdb응답 받기
export interface tmdbListResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
  [key: string]: unknown; // 인덱스 시그니처 추가
}

export type heroBannerImage = { backdrop: string };
export type previewPoster = { poster: string };
