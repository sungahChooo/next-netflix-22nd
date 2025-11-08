"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetcher } from "@/lib/fetcher";
import type { tmdbListResponse, tmdbTitle } from "@/types/tmdb";

const IMG_BASE = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE || "https://image.tmdb.org/t/p";

type Row = { id: number; poster_path: string };

export default function Previews() {
  const [items, setItems] = useState<Row[]>([]);

  useEffect(() => {
    fetcher<tmdbListResponse<tmdbTitle>>("/3/movie/now_playing", {
      language: "ko-KR",
      page: "1",
      region: "KR",
    })
      .then((data) => {
        const rows =
          (data.results ?? [])
            .filter((t) => !!t.poster_path && !!t.id)
            .slice(0, 10) //10개만 (임의)
            .map((t) => ({ id: t.id!, poster_path: t.poster_path! }));
        setItems(rows);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="flex-col w-[390px] px-[12px] pt-[23px]">
      <span className="text-white text-[22px] font-semibold mb-[23px]">Previews</span>

      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {items.map((item) => {
          const pathOnly = item.poster_path.startsWith("/")
            ? item.poster_path
            : `/${item.poster_path}`;

          //쿼리에 path전달
          const thumbUrl = `${IMG_BASE}/w342${pathOnly}`;

          return (
            <div key={item.id} className="shrink-0 snap-start">
              <Link
                href={{
                  pathname: `/title/${item.id}`,
                  query: { img: pathOnly },
                }}
                prefetch={false}
              >
                <img
                  src={thumbUrl}
                  alt={`preview-${item.id}`}
                  className="w-[102px] h-[102px] mr-[7px] mt-[12px] rounded-full object-cover cursor-pointer"
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
