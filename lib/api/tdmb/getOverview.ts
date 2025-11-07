const TMDB_API_BASE = "https://api.themoviedb.org/3";
const TMDB_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY!;

type Kind = "movie" | "tv";
type Result = { kind: Kind | null; overview: string };

export async function fetchOverview(
  id: string | number,
  opts?: { language?: string }
): Promise<Result> {
  const language = opts?.language ?? "en-US";
  const kinds: Kind[] = ["movie", "tv"];
  const langs = [language, "en-US"];

  for (const lang of langs) {
    for (const kind of kinds) {
      const url = `${TMDB_API_BASE}/${kind}/${id}?language=${lang}&api_key=${TMDB_KEY}`;
      const res = await fetch(url);
      if (!res.ok) continue;
      const json = await res.json();
      const text = (json?.overview || "").trim();
      if (text) return { kind, overview: text };
    }
  }
  return { kind: null, overview: "" };
}
