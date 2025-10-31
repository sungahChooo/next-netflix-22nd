"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import { fetchNetflixOriginals } from "@/lib/tdmbs";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

export default function NetflixOriginals() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movieData = await fetchNetflixOriginals();
        setMovies(movieData);
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
      }
    };

    loadMovies();
  }, []);

  return (
    <section className="px-2 py-1 flex flex-col gap-2 mb-8">
      <SectionTitle title="Netflix Originals" />

      <div className="flex scrollbar-hide gap-2 overflow-hidden bg-black scrollbar-custom">
        {movies
          .filter((movie) => movie.poster_path) // null 아닌 것만
          .slice(0, 5) // 5개만 표시
          .map((movie) => (
            <div
              key={movie.id}
              className="relative w-[154px] h-[251px] flex-shrink-0 group"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                sizes="(max-width: 768px) 30vw, 103px"
                className="rounded-xs transition-transform duration-200 group-hover:scale-105"
              />
            </div>
          ))}
      </div>
    </section>
  );
}
