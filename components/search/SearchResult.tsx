import Link from 'next/link';
import Image from 'next/image';
import type { TMDBMovie } from '@/lib/api/types/tdmbs';
import { RefObject } from 'react';
import MovieSkeleton from '@/components/search/SearchSkeleton';

const IMG_BASE = 'https://image.tmdb.org/t/p';

export default function SearchResult({
  movies,
  query,
  loaderRef,
  hasMore,
  loading,
}: {
  movies: TMDBMovie[];
  query: string;
  loaderRef: RefObject<HTMLDivElement | null>;
  hasMore: boolean;
  loading: boolean;
}) {
  const state = query ? `Results for "${query}"` : 'Top Searches';
  if (!movies?.length) return <div className="text-gray-400 mt-4 text-center">검색 결과가 없습니다. 😢</div>;
  return (
    <section className="bg-gray text-white flex flex-col gap-2">
      <span className="font-bold text-2xl pl-2">{state}</span>
      {loading ? (
        <MovieSkeleton count={10} />
      ) : (
        movies.map((m) => {
          const path = m.poster_path || m.backdrop_path || '';
          const src = path ? `${IMG_BASE}/w500${path}` : '/placeholder-portrait.png';
          return (
            <Link
              key={m.id}
              href={{ pathname: `/title/${m.id}`, query: { img: path } }}
              prefetch={false}
              className="cursor-pointer bg-[#424242] w-full h-[76px]
                        flex items-center gap-3 pr-2 rounded-xl justify-between hover:bg-[#4a4a4a]"
            >
              <div className="relative w-[146px] h-[76px] rounded-md overflow-hidden flex-shrink-0">
                <Image src={src} alt="" fill sizes="146px" className="object-cover" />
              </div>
              <span className="font-semibold line-clamp-1">{m.title}</span>
              <Image src="/icons/playSearch.svg" alt="" className="w-7 h-auto" height={28} width={28} />
            </Link>
          );
        })
      )}
      <div ref={loaderRef} className="h-10 flex justify-center items-center">
        {hasMore ? '로딩 중입니다.' : '더 이상 조회된 영화가 없습니다.'}
      </div>
    </section>
  );
}
