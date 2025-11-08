"use client";

import { useEffect, useState } from "react";
import { fetchMovieById } from "@/lib/api/tdmb/movie";
import Image from "next/image";
import SectionTitle from "@/components/home/section/SectionTitle";
import { watchHistory } from "@/data/watchHistory";
import type { TMDBMovie } from "@/lib/api/types/tdmbs";
import Thumbnail from '@/components/Thumbnail';

export default function WatchItAgain() {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);

  useEffect(() => {
    async function loadMovies() {
      const data = await Promise.all(
        watchHistory.map((item) => fetchMovieById(item.contentId))
      );
      setMovies(data);
    }
    loadMovies();
  }, []);

  return (
    <section className="px-2 py-2 flex flex-col gap-2">
      <SectionTitle title="Watch It Again" />

      <div className="flex scrollbar-hide gap-2  overflow-hidden bg-black scrollbar-custom">
        {movies
          .filter((movie) => movie.poster_path)
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
