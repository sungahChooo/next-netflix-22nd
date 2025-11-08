import Image from 'next/image';
import type { TMDBMovie } from '@/lib/api/types/tdmbs';
import { RefObject } from 'react';
import MovieSkeleton from '@/components/search/SearchSkeleton';
import Thumbnail from '@/components/Thumbnail';

interface SearchResultProps {
  movies: TMDBMovie[];
  query: string;
  loaderRef: RefObject<HTMLDivElement | null>; // loader ref 추가
  hasMore: boolean; // 더 불러올 영화가 있는지
  loading: boolean;
}

export default function SearchResult({ movies, query, loaderRef, hasMore, loading }: SearchResultProps) {
  const state = query ? `Results for "${query}"` : 'Top Searches';

  if (!movies || movies.length === 0) {
    return <div className="text-gray-400 mt-4 text-center">검색 결과가 없습니다. 😢</div>;
  }
  return (
    <section className="bg-gray text-white flex flex-col justify-center gap-2">
      <span className="font-bold text-2xl text-start pl-2">{state}</span>
      {loading ? (
        <MovieSkeleton count={6} />
      ) : movies.length === 0 ? (
        <div className="text-gray-400 mt-4 text-center">검색 결과가 없습니다. 😢</div>
      ) : (
        movies.map((movie) => (
          <div
            key={movie.id}
            className=" cursor-pointer bg-[#424242] w-full h-[76px] flex items-center gap-3 pr-2 rounded-xl justify-between"
          >
            <div className="relative w-[146px] h-[76px] rounded-md overflow-hidden flex-shrink-0">
              <Thumbnail item={movie} imgSize="w500" className="absolute inset-0" />
            </div>
            <span className="font-semibold">{movie.title}</span>
            <Image
              src="/icons/playSearch.svg"
              alt="Play Search Icon"
              width={28} // 필수
              height={84} // 필수
            />
          </div>
        ))
      )}
      {/* 무한 스크롤 감지 div */}
      <div ref={loaderRef} className="h-10 flex justify-center items-center text-white">
        {hasMore ? '로딩 중입니다.' : '더 이상 조회된 영화가 없습니다.'}
      </div>
    </section>
  );
}
