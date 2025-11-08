'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import SectionTitle from '@/components/home/section/SectionTitle';
import { fetchNetflixOriginals } from '@/lib/api/tdmb/combined';
import type { TMDBMovie, TMDBTvShow } from '@/lib/api/types/tdmbs';
import Thumbnail from '@/components/Thumbnail';

type CombinedItem = TMDBMovie | TMDBTvShow;

export default function NetflixOriginals() {
  const [data, setData] = useState<CombinedItem[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchNetflixOriginals();
        setData(data);
      } catch (error) {
        console.error('Failed to fetch popular movies:', error);
      }
    };

    loadMovies();
  }, []);

  return (
    <section className="px-2 py-1 flex flex-col gap-2 mb-8">
      <SectionTitle title="Netflix Originals" />

      <div className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide cursor-pointer">
        {data
          .filter((movie) => movie.poster_path) // null 아닌 것만
          .slice(0, 5) // 5개만 표시
          .map((movie) => (
            <div key={movie.id} className="relative w-[154px] h-[251px] flex-shrink-0 group">
              <Thumbnail item={movie} imgSize="w500" className="absolute inset-0" />
            </div>
          ))}
      </div>
    </section>
  );
}
