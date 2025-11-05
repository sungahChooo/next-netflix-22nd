'use client';

import { useEffect, useState } from 'react';
import { fetchMovieById } from '@/lib/api/tdmb/movie';
import Image from 'next/image';
import SectionTitle from '@/components/home/section/SectionTitle';
import { watchHistory } from '@/data/watchHistory';
import type { TMDBMovie } from '@/lib/api/types/tdmbs';

export default function WatchItAgain() {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);

  useEffect(() => {
    async function loadMovies() {
      const data = await Promise.all(watchHistory.map((item) => fetchMovieById(item.contentId)));
      setMovies(data);
    }
    loadMovies();
  }, []);

  return (
    <section className="px-2 py-2 flex flex-col gap-2">
      <SectionTitle title="Watch It Again" />

      <div className="flex scrollbar-hide gap-2  overflow-hidden bg-black scrollbar-custom cursor-pointer">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <div key={movie.id} className="relative w-[103px] h-[161px] flex-shrink-0 group">
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
