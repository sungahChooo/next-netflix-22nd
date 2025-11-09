'use client';
import SearchResult from '@/components/search/SearchResult';
import SearchSection from '@/components/search/SearchSection';
import { fetchPopularMovies, fetchSearchMovie } from '@/lib/api/tdmb/movie';
import type { TMDBMovie } from '@/lib/api/types/tdmbs';
import { useEffect, useRef, useState } from 'react';

export default function Search() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<TMDBMovie[]>([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMovies = async (isNewSearch = false) => {
    setLoading(true);
    const nextPage = isNewSearch ? 1 : page;
    let data: TMDBMovie[] = [];

    try {
      if (!query) {
        data = await fetchPopularMovies('en-US', nextPage);
      } else {
        data = await fetchSearchMovie('ko-KR', query, nextPage);
      }

      if (isNewSearch) {
        setMovies(data.slice(0, 10)); // 새로운 검색 시 처음 10개만 보여주기
        setPage(2);
      } else {
        setMovies((prev) => {
          const merged = [...prev, ...data.slice(0, 10)]; // 다음 페이지에서 10개만 추가
          return Array.from(new Map(merged.map((m) => [m.id, m])).values());
        });
        setPage((prev) => prev + 1);
      }

      setHasMore(data.length > 0);
    } catch (error) {
      console.log('error:', error);
    } finally {
      setLoading(false);
    }
  };

  // 검색어 변경 시 초기화
  useEffect(() => {
    loadMovies(true);
  }, [query]);

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !loading) {
          loadMovies();
        }
      },
      { root: null, rootMargin: '200px', threshold: 0.1 },
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasMore, loading, query]);

  return (
    <div className="flex flex-col min-h-screen bg-black w-[375px]">
      {/* 상단 고정 검색창 + Top search */}
      <div className="fixed pt-11 w-[375px] justify-center z-10 bg-black flex flex-col">
        <SearchSection query={query} onChange={setQuery} />
      </div>

      {/* 검색결과 목록 */}
      <div className="flex-1 overflow-y-auto px-4 pb-8 mt-[120px]">
        {/* mt-[104px] = fixed 헤더(SearchSection + Top search) 높이만큼 */}
        <SearchResult movies={movies} query={query} loaderRef={loaderRef} hasMore={hasMore} loading={loading} />
      </div>
    </div>
  );
}
