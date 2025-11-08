'use client';
import SearchResult from '@/components/search/SearchResult';
import SearchSection from '@/components/search/SearchSection';
import { fetchPopularMovies, fetchSearchMovie } from '@/lib/api/tdmb/movie';
import type { TMDBMovie } from '@/lib/api/types/tdmbs';
import { useEffect, useState } from 'react';

export default function Search() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<TMDBMovie[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      if (!query) {
        const data = await fetchPopularMovies();
        setMovies(data);
      } else {
        const data = await fetchSearchMovie('ko-KR', query);
        setMovies(data);
      }
    };

    loadMovies();
  }, [query]);

  return (
    <div className="flex flex-col min-h-screen bg-black w-[375px]">
      {/* 상단 고정 검색창 + Top search */}
      <div className="fixed pt-11 w-[375px] justify-center z-10 bg-black flex flex-col">
        <SearchSection query={query} onChange={setQuery} />
      </div>

      {/* 검색결과 목록 */}
      <div className="flex-1 overflow-y-auto px-4 pb-8 mt-[120px]">
        {/* mt-[104px] = fixed 헤더(SearchSection + Top search) 높이만큼 */}
        <SearchResult movies={movies} query={query} />
      </div>
    </div>
  );
}
