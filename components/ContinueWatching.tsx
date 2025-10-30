"use client";

import { useEffect, useState } from "react";
import { fetchMovieById } from "@/libs/tdmbs";
import Image from "next/image";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

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
    <section className="px-2 py-8">
      <div className="text-xl font-semibold w-[350px] text-white">
        Continue Watching for Emenalo
      </div>

      <div className="flex scrollbar-hide gap-1">
        {movies.map((movie) => (
          <div key={movie.id} className="relative group">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={103}
              height={177}
              className="rounded-xs transition-transform duration-200 group-hover:scale-105 "
            />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
              <div className="h-1 bg-red-500" style={{ width: "45%" }} />
              {/* 진행률 예시 */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
