"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import { fetchPopularMovies } from "@/libs/tdmbs";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

export default function Popular() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const movieData = await fetchPopularMovies();
        setMovies(movieData);
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
      }
    };

    getPopularMovies();
  }, []);

  return (
    <section className="px-2 py-2 flex flex-col gap-2">
      <SectionTitle title="Popular on Netflix" />

      <div className="flex scrollbar-hide gap-2 overflow-x-scroll overflow-y-hidden bg-black scrollbar-custom">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 group relative h-[161px]"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={103}
              height={177}
              className="rounded-xs transition-transform duration-200 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
