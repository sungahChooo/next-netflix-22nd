import Image from 'next/image';
import type { TMDBMovie } from '@/lib/api/types/tdmbs';

interface SearchResultProps {
  movies: TMDBMovie[];
  query: string;
}

export default function SearchResult({ movies, query }: SearchResultProps) {
  //const state = query ? `Results for "${query}"` : 'Top Searches';

  if (!movies || movies.length === 0) {
    return <div className="text-gray-400 mt-4 text-center">검색 결과가 없습니다. 😢</div>;
  }
  return (
    <section className="bg-gray text-white flex flex-col justify-center gap-2">
      {/*<span className="font-bold text-2xl text-start pl-2">{state}</span>*/}
      {movies.map((movie) => (
        <div key={movie.id} className="bg-[#424242] w-full h-[76px] flex items-center gap-3 pr-2 rounded-xl">
          <div className="relative w-[146px] h-[76px] rounded-md overflow-hidden flex-shrink-0">
            <Image
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              fill
              className="rounded-md object-cover"
            />
          </div>
          <span className="font-semibold">{movie.title}</span>
        </div>
      ))}
    </section>
  );
}
