"use client";

import { useEffect, useState } from "react";
import { fetchMovieById } from "@/lib/tdmbs";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import { watchHistory } from "@/data/watchHistory";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};
// 사용자 이름 가져오기 (더미 데이터 기준)
const userName = watchHistory[0]?.userName || "User";
const MOCK_WATCHING_IDS = [550, 299534, 155, 597, 681];

export default function ContinueWatching() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function loadMovies() {
      const data = await Promise.all(
        MOCK_WATCHING_IDS.map((id) => fetchMovieById(id))
      );
      setMovies(data);
    }
    loadMovies();
  }, []);

  return (
    <section className="px-2 py-2 flex flex-col gap-2">
      <SectionTitle title={`Continue Watching for ${userName}`} />

      <div className="flex scrollbar-hide gap-2  overflow-hidden bg-black scrollbar-custom">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <div
              key={movie.id}
              className="relative w-[103px] h-[161px] flex-shrink-0 group"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                sizes="(max-width: 768px) 30vw, 103px"
                className="rounded-xs transition-transform duration-200 group-hover:scale-105"
              />
              {/* 진행률 표시*/}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
                <div className="h-1 bg-red-500" style={{ width: "70%" }} />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
