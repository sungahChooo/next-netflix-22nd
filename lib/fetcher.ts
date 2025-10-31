// lib/fetcher.ts
export async function fetcher<T>(
  endpoint: string,
  params?: Record<string, string>,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl =
    process.env.NEXT_PUBLIC_TMDB_V3_BASE_URL || "https://api.themoviedb.org";
  const url = new URL(endpoint, baseUrl);

  // API 키 추가
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  url.searchParams.append("api_key", apiKey || "");

  // 공통 쿼리 추가
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  // 인증: v4 Bearer 우선, 없으면 v3 api_key 쿼리
  const v4Token = process.env.NEXT_PUBLIC_TMDB_V4_ACCESS_TOKEN;

  const res: Response = await fetch(url.toString(), {
    next: { revalidate: 3600 },
    headers: {
      ...(v4Token ? { Authorization: `Bearer ${v4Token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`TMDB fetch failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}
