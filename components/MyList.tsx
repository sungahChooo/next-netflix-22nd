"use client";

import { useEffect, useState } from "react";
import { fetchMovieById } from "../lib/api/tdmb/movie";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

const MOCK_WATCHING_IDS = [555, 299535, 157, 97, 682]; //임의로 지정한 My List 영화 ID들

export default function MyList() {
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
      <SectionTitle title="My List" />

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
            </div>
          ))}
      </div>
    </section>
  );
}
