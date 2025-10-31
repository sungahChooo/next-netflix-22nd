export type WatchHistoryItem = {
  id: number; // 더미 데이터 고유 ID
  userName: string; // 사용자 이름
  contentId: number; // TMDB id
  title: string; // 영화/TV 제목
  type: "movie" | "tv"; // 구분
  watchedAt: string; // 시청 날짜 (ISO 문자열)
};

export const watchHistory: WatchHistoryItem[] = [
  {
    id: 1,
    userName: "성아 조",
    contentId: 552,
    title: "Fight Club",
    type: "movie",
    watchedAt: "2025-10-31T14:23:00Z",
  },
  {
    id: 2,
    userName: "성아 조",
    contentId: 598,
    title: "Game of Thrones",
    type: "movie",
    watchedAt: "2025-10-30T20:45:00Z",
  },
  {
    id: 3,
    userName: "성아 조",
    contentId: 680,
    title: "The Shawshank Redemption",
    type: "movie",
    watchedAt: "2025-10-29T19:10:00Z",
  },
];
