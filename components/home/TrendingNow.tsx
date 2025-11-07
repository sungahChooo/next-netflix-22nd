"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SectionTitle from "@/components/home/SectionTitle";
import { fetchTrendingMovies } from "@/lib/api/tdmb/movie";
import type { TMDBMovie } from "@/lib/api/types/tdmbs";
import Thumbnail from '@/components/Thumbnail';

export default function TrendingNow() {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movieData = await fetchTrendingMovies();
        setMovies(movieData);
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
      }
    };

    loadMovies();
  }, []);

  return (
    <section className="px-2 py-2 flex flex-col gap-2">
      <SectionTitle title="Trending Now" />

      <div className="flex scrollbar-hide gap-2 overflow-hidden bg-black scrollbar-custom">
        {movies
          .filter((movie) => movie.poster_path) // null 아닌 것만
          .slice(0, 5) // 5개만 표시
          .map((movie) => (
            <div
              key={movie.id}
              className="relative w-[103px] h-[161px] flex-shrink-0 group"
            >
              <Thumbnail item={movie} imgSize="w500" className="absolute inset-0" />
            </div>
          ))}
      </div>
    </section>
  );
}
