'use client';

import { useEffect, useState } from 'react';
import SectionTitle from '@/components/home/section/SectionTitle';
import { fetchKoreanMovies } from '@/lib/api/tdmb/movie';
import type { TMDBMovie } from '@/lib/api/types/tdmbs';
import Thumbnail from '@/components/Thumbnail';

export default function KoreanMovies() {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchKoreanMovies();
        setMovies(data);
      } catch (error) {
        console.error('Failed to fetch Korean movies:', error);
      }
    };

    loadMovies();
  }, []);

  return (
    <section className="px-2 py-1 flex flex-col gap-2">
      <SectionTitle title="Korean Movies" />

      {/* Scroll Snap 적용 */}
      <div className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide cursor-pointer">
        {movies
          .filter((movie) => movie.poster_path) // null 아닌 것만
          .slice(0, 5) // 5개만 표시
          .map((movie) => (
            <div key={movie.id} className="relative w-[103px] h-[161px] flex-shrink-0 snap-start">
              <Thumbnail item={movie} imgSize="w500" className="absolute inset-0" />
            </div>
          ))}
      </div>
    </section>
  );
}
