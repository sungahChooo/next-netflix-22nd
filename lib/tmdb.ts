// lib/tmdb.ts
import { fetcher } from "./fetcher";

const IMG_BASE = "https://image.tmdb.org/t/p";

//배너용 이미지 URL
function backdropUrl(path?: string, size: string = "w780") {
    return path ? `${IMG_BASE}/${size}${path}` : "";
}

//preview 썸네일 용 이미지 URL
function posterUrl(path?: string, size: string = "w342") {
    return path ? `${IMG_BASE}/${size}${path}` : "";
}

//배너용 이미지 export햠수
export async function getHeroBannerImage() {
    const data = await fetcher<any>("/movie/popular", {
        language: "ko-KR",
        page: "1",
        region: "KR",
    });
    const first = data.results?.[0];
    return {
        backdrop: backdropUrl(first?.backdropPath, "w780"),
    };
}

//프리뷰 이미지 export 함수
export async function getPreviewPosters() {
    const data = await fetcher<any>("/movie/now_playing", {
        language: "ko-KR",
        page: "1",
        region: "KR",
    });

    return data.results
        .slice(0, 10)
        .map((movie: any) => ({
            poster: posterUrl(movie.poster_path, "w342"),
        }));
}
