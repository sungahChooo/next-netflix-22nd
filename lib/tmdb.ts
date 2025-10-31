// lib/tmdb.ts
import { fetcher } from "./fetcher";
import type { tmdbListResponse, tmdbTitle, previewPoster, heroBannerImage } from "@/types/tmdb"
const IMG_BASE = "https://image.tmdb.org/t/p";


//배너용 이미지 URL
function backdropUrl(path: string | null | undefined, size = "w780") {
    return path ? `${IMG_BASE}/${size}${path}` : "";
}

//preview 썸네일 용 이미지 URL
function posterUrl(path: string | null | undefined, size = "w342") {
    return path ? `${IMG_BASE}/${size}${path}` : "";
}

//배너용 이미지 export함수
export async function getHeroBannerImage(): Promise<heroBannerImage> {
    const data = await fetcher<tmdbListResponse<tmdbTitle>>("/movie/popular", {
        language: "ko-KR",
        page: "1",
        region: "KR",
    });
    const first = data.results?.[0];
    return {
        backdrop: backdropUrl(first?.backdrop_path, "w780"),
    };
}

//프리뷰 이미지 export 함수
export async function getPreviewPosters(): Promise<previewPoster[]> {
    const data = await fetcher<tmdbListResponse<tmdbTitle>>("/movie/now_playing", {
        language: "ko-KR",
        page: "1",
        region: "KR",
    });

    return data.results
        .slice(0, 10)
        .map((movie) => ({
            poster: posterUrl(movie.poster_path, "w342"),
        }));
}